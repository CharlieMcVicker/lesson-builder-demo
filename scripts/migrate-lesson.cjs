const fs = require('fs');
const path = require('path');

function migrate(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    if (!data.lesson || !data.vocab) {
        console.error("Invalid file structure. Expected { lesson: ..., vocab: ... }");
        return;
    }

    const { lesson, vocab } = data;

    const migratedModules = lesson.modules.map(module => {
        const newData = { ...module.data };

        if (module.type === 'match') {
            // newData.data was VocabItem[], now string[] (IDs)
            newData.data = newData.data.map(item => typeof item === 'string' ? item : item.id);
        } else if (module.type === 'sentence') {
            // targetSentence was VocabItem, now string (ID)
            if (newData.targetSentence && typeof newData.targetSentence !== 'string') {
                newData.targetSentence = newData.targetSentence.id;
            }
            // orderedPieces was VocabItem[], now string[] (IDs)
            newData.orderedPieces = newData.orderedPieces.map(item => typeof item === 'string' ? item : item.id);
        } else if (module.type === 'conversation') {
            // lines[].sentence was VocabItem, now string (ID)
            newData.lines = newData.lines.map(line => ({
                ...line,
                sentence: typeof line.sentence === 'string' ? line.sentence : line.sentence.id
            }));
            // distractorOptions was VocabItem[], now string[] (IDs)
            newData.distractorOptions = newData.distractorOptions.map(item => typeof item === 'string' ? item : item.id);
        }

        return {
            ...module,
            data: newData
        };
    });

    const migratedLesson = {
        ...lesson,
        modules: migratedModules
    };

    const output = JSON.stringify({ lesson: migratedLesson, vocab }, null, 2);
    fs.writeFileSync(filePath, output);
    console.log(`Successfully migrated ${filePath}`);
}

const target = process.argv[2];
if (!target) {
    console.log("Usage: node migrate-lesson.js <path-to-json>");
    process.exit(1);
}

migrate(path.resolve(target));
