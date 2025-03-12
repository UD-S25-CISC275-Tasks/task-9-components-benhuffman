import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    //const deepCopy = questions.map((question: Question) => ({...questions}));
    const test = questions.filter((question: Question) => question.published);
    const deepCopy = test.map((question: Question) => ({ ...question }));
    return deepCopy;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    //empty = body = "", expected = "", options = [];

    const test = questions.filter(
        (question: Question) =>
            !(
                question.body == "" &&
                question.expected == "" &&
                question.options.length == 0
            ),
    );
    return test;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const filtered = questions.filter(
        (question: Question) => question.id == id,
    );
    if (filtered.length == 0) return null;

    return filtered[0];
}
//all it means is that your argument is always going to point towards THAT object, the function won't change that
/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const filtered = questions.filter(
        (question: Question) => question.id != id,
    );
    return filtered;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((question: Question) => question.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.points,
        0,
    );
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions
        .filter((question) => question.published)
        .reduce((sum, question) => sum + question.points, 0);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    var output = "id,name,options,points,published";

    return questions.reduce(
        (accumulator, currentValue) =>
            accumulator +
            `\n${currentValue.id},${currentValue.name},${currentValue.options.length},${currentValue.points},${currentValue.published}`,
        output,
    );
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map((question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false,
    }));
}

export function publishAll(questions: Question[]): Question[] {
    return questions.map((question) => ({ ...question, published: true }));
}

export function sameType(questions: Question[]): boolean {
    return questions.every((question) => question.type === questions[0]?.type);
}
/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the makeBlankQuestion
 * you defined in the objects.ts file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [
        ...questions,
        {
            id,
            name,
            type,
            body: "",
            options: [],
            expected: "",
            points: 1,
            published: false,
        },
    ];
}

export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    return questions.map((question) =>
        question.id === targetId ? { ...question, name: newName } : question,
    );
}

export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    return questions.map((question) =>
        question.id === targetId ?
            {
                ...question,
                type: newQuestionType,
                options:
                    newQuestionType !== "multiple_choice_question" ?
                        []
                    :   question.options,
            }
        :   question,
    );
}

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((question) => {
        if (question.id === targetId) {
            const newOptions = [...question.options];
            if (targetOptionIndex === -1) {
                newOptions.push(newOption);
            } else {
                newOptions[targetOptionIndex] = newOption;
            }
            return { ...question, options: newOptions };
        }
        return question;
    });
}

function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        ...oldQuestion,
        name: `Copy of ${oldQuestion.name}`,
        published: false,
        id: id,
    };
}
/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id targetId should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the duplicateQuestion
 * function you defined previously; the newId is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    const index = questions.findIndex((question) => question.id === targetId);
    if (index === -1) return questions;
    const duplicate = duplicateQuestion(newId, questions[index]);
    return [
        ...questions.slice(0, index + 1),
        duplicate,
        ...questions.slice(index + 1),
    ];
}