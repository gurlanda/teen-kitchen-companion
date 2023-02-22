// import Journal from '../../../../model/journal/Journal';
// import * as Questions from '../../../../model/survey/question/questions';
// import Option from '../../../../model/survey/question/Option';
// import * as ScaleTypes from '../../../../model/survey/question/ImgOption/scaleTypes';
// import ImgOption from '../../../../model/survey/question/ImgOption';
// import { RowQuestion } from '../../../../model/survey/question/GridQuestion';

// export const testQuestions = [
//   new Questions.DateTimeQuestion(false, 'DateTime', 'DATETIME'),
//   new Questions.TimeQuestion(false, 'Time', 'TIME'),
//   new Questions.DateQuestion(false, 'Date', 'DATE'),
//   new Questions.NumberQuestion(false, 'Number', null, null, null, 'NUMBER'),
//   new Questions.ShortAnswerQuestion(false, 'Short answer', 'SHORT_ANSWER'),
//   new Questions.LongAnswerQuestion(false, 'Long answer', 5, 'LONG ANSWER'),
//   new Questions.MultChoiceQuestion(
//     true,
//     'MultChoice',
//     [
//       new Option('opt1'),
//       new Option('opt2'),
//       new Option('opt3'),
//       new Option('opt4'),
//     ],
//     'MULTCHOICE'
//   ),
//   new Questions.CheckboxQuestion(
//     true,
//     'Checkbox',
//     [
//       new Option('opt1'),
//       new Option('opt2'),
//       new Option('opt3'),
//       new Option('opt4'),
//     ],
//     'CHECKBOX'
//   ),
//   new Questions.LinearScaleQuestion(
//     true,
//     'Linear Scale',
//     1,
//     5,
//     1,
//     'Lowest',
//     'Highest',
//     'LINEAR SCALE'
//   ),
//   new Questions.ImgLinearScaleQuestion(
//     true,
//     'Image linear scale',
//     ScaleTypes.CONTROL,
//     'Controlled',
//     'In control',
//     [
//       new ImgOption(1, ScaleTypes.CONTROL, false),
//       new ImgOption(2, ScaleTypes.CONTROL, false),
//       new ImgOption(3, ScaleTypes.CONTROL, false),
//       new ImgOption(4, ScaleTypes.CONTROL, false),
//       new ImgOption(5, ScaleTypes.CONTROL, false),
//     ],
//     'IMG_LINEAR_SCALE'
//   ),
//   new Questions.CheckboxGridQuestion(
//     true,
//     'Checkbox Grid',
//     [
//       new RowQuestion('row1'),
//       new RowQuestion('row2'),
//       new RowQuestion('row3'),
//       new RowQuestion('row4'),
//     ],
//     [
//       new Option('opt1'),
//       new Option('opt2'),
//       new Option('opt3'),
//       new Option('opt4'),
//       new Option('opt5'),
//     ],
//     'CHECKBOX_GRID'
//   ),
//   new Questions.MultChoiceGridQuestion(
//     true,
//     'Checkbox Grid',
//     [
//       new RowQuestion('row1'),
//       new RowQuestion('row2'),
//       new RowQuestion('row3'),
//       new RowQuestion('row4'),
//     ],
//     [
//       new Option('opt1'),
//       new Option('opt2'),
//       new Option('opt3'),
//       new Option('opt4'),
//       new Option('opt5'),
//     ],
//     'CHECKBOX_GRID'
//   ),
// ];

// export const journalQuestions = [
//   new Questions.DateQuestion(false, 'Date of your meal/snack', 'DATE'),
//   new Questions.TimeQuestion(
//     false,
//     'When did you start your meal/snack?',
//     'TIME'
//   ),
//   new Questions.TimeQuestion(
//     false,
//     'When did you finish your meal/snack?',
//     'TIME'
//   ),
//   new Questions.ShortAnswerQuestion(
//     false,
//     'Place you had your meal/snack. (For example: kitchen, living room, bedroom, car, desk, at work)',
//     'SHORT_ANSWER'
//   ),
//   new Questions.ShortAnswerQuestion(
//     false,
//     'People you had your meal/snack with. (For example: alone, with family/friends, collegues)',
//     'SHORT_ANSWER'
//   ),
//   new Questions.LinearScaleQuestion(
//     true,
//     'Hunger level',
//     0,
//     5,
//     1,
//     'No hunger',
//     'Starving',
//     'LINEAR SCALE'
//   ),
//   new Questions.ShortAnswerQuestion(false, 'Amount eaten', 'SHORT_ANSWER'),
//   new Questions.ShortAnswerQuestion(false, 'Food eaten', 'SHORT_ANSWER'),
//   new Questions.MultChoiceQuestion(
//     true,
//     'How do you feel after eating?',
//     [
//       new Option('1: Still hungry'),
//       new Option('2: Quite satisfied'),
//       new Option('3: Uncomfortable'),
//     ],
//     'MULTCHOICE'
//   ),
//   // new Questions.ImgLinearScaleQuestion(
//   //   true,
//   //   'How do you feel?',
//   //   1,
//   //   9,
//   //   1,
//   //   ScaleTypes.HAPPINESS,
//   //   'Happy',
//   //   'Unhappy',
//   //   [
//   //     new ImgOption(1, ScaleTypes.HAPPINESS, false),
//   //     new ImgOption(2, ScaleTypes.HAPPINESS, false),
//   //     new ImgOption(3, ScaleTypes.HAPPINESS, false),
//   //     new ImgOption(4, ScaleTypes.HAPPINESS, false),
//   //     new ImgOption(5, ScaleTypes.HAPPINESS, false),
//   //   ],
//   //   'IMG_LINEAR_SCALE'
//   // ),
//   // new Questions.ImgLinearScaleQuestion(
//   //   true,
//   //   'How do you feel?',
//   //   ScaleTypes.ENERGY,
//   //   'Excited',
//   //   'Calm',
//   //   [
//   //     new ImgOption(1, ScaleTypes.ENERGY, false),
//   //     new ImgOption(2, ScaleTypes.ENERGY, false),
//   //     new ImgOption(3, ScaleTypes.ENERGY, false),
//   //     new ImgOption(4, ScaleTypes.ENERGY, false),
//   //     new ImgOption(5, ScaleTypes.ENERGY, false),
//   //   ],
//   //   'IMG_LINEAR_SCALE'
//   // ),
//   // new Questions.ImgLinearScaleQuestion(
//   //   true,
//   //   'How do you feel?',
//   //   ScaleTypes.CONTROL,
//   //   'Controlled',
//   //   'In control',
//   //   [
//   //     new ImgOption(1, ScaleTypes.CONTROL, false),
//   //     new ImgOption(2, ScaleTypes.CONTROL, false),
//   //     new ImgOption(3, ScaleTypes.CONTROL, false),
//   //     new ImgOption(4, ScaleTypes.CONTROL, false),
//   //     new ImgOption(5, ScaleTypes.CONTROL, false),
//   //   ],
//   //   'IMG_LINEAR_SCALE'
//   // ),
// ];

// const testJournal = new Journal(
//   new Date(2022, 5, 26),
//   new Date(2022, 6, 2),
//   journalQuestions,
//   '62c6530b933cc93ca131c118'
// );

// const journals = [
//   new Journal(
//     new Date(2022, 5, 26),
//     new Date(2022, 6, 2),
//     journalQuestions,
//     '62c6530b933cc93ca131c118'
//   ),
//   new Journal(
//     new Date(2022, 6, 3),
//     new Date(2022, 6, 9),
//     journalQuestions,
//     '62c6530b933cc93ca131c120'
//   ),
//   new Journal(
//     new Date(2022, 6, 10),
//     new Date(2022, 6, 16),
//     journalQuestions,
//     '62c6530b933cc93ca131c122'
//   )
// ]

// export default journals;
export {};
