# Documentation

## Conventions

Below are the conventions that we will follow in our UML class diagrams.

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class ClassConventions {
    - {static} staticMember: MemberType
    + requiredMember: MemberType
    + requiredArrayMember: [ArrayElementType]
    ~ optionalMember: MemberType
    - {static} staticMethod(): ReturnType
    + requiredMethod(\
      \n\t requiredParameter: ParameterType,
      \t [optionalParameter = defaultValue: ValueType]\n): ReturnType
    + anotherRequiredMethod(\
      \n\t requiredParameter: ParameterType\
      \n\t anotherParameter: ParameterType
    ): (ParameterType) => ReturnType
    ~ optionalMethod(): ReturnType
  }

  note right of ClassConventions::optionalParameter
    ValueType can be ommitted
    if the type of the value
    is clear from the context
  endnote

  note right of ClassConventions::anotherRequiredMethod
    This method returns a function
  endnote
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class "**AbstractClass**" as AbstractClass <<Abstract>> {
    # {abstract} abstractMember: MemberType
    # {abstract} abstractMethod(): ReturnType
  }

  note left of AbstractClass::abstractMember
    To be instantiated
    in a subclass
  endnote

  note left of AbstractClass::abstractMethod
    To be implemented
    in a subclass
  endnote

  note left of ConcreteClass::abstractMember
    Overriden/instantiated
    over superclass
  endnote

  note right of ConcreteClass::abstractMember
    ValueType can be ommitted
    if the type of the value
    is clear from the context
  endnote

  note left of ConcreteClass::abstractMethod
    Overriden/implemented
    over superclass
  endnote

  class "**ConcreteClass**" as ConcreteClass {
    + requiredMemberOfConcreteClass: MemberType
    ..//Inherited from// AbstractClass..
    # abstractMember = concreteValue: ValueType
    --
    + requiredMethodOfConcreteClass(): ReturnType
    ..//Overriden over// AbstractClass..
    # abstractMethod(): ReturnType
  }

  AbstractClass <|-- ConcreteClass
@enduml
```

## Server-side classes

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class Survey {
    + title: String
    + description: String
    + questions: [Question]
    ~ _id: ObjectId or ObjectId string
    ~ __v: Integer
    ~ deactivatedAt: Date
  }

  class Question {
    + isRequired: Boolean
    + questionText: String
    + type: QuestionType enum
    + additionalData: Object or ""null""
  }

@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class ShortAnswerQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    + isRequired: Boolean
    + questionText: String
    # type = SHORT_ANSWER
    # additionalData = ""null""
  }

  class LongAnswerQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    + isRequired: Boolean
    + questionText: String
    # type = LONG_ANSWER
    # additionalData: Object
  }

  class "additionalData" as laData {
    + numLines: Number or ""null""
  }

  LongAnswerQuestion *-- laData

  class NumberQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    + isRequired: Boolean
    + questionText: String
    # type = NUMBER
    # additionalData: Object
  }

  class "additionalData" as numData {
    + min: Number or ""null""
    + max: Number or ""null""
    + step: Number or ""null""
  }

  NumberQuestion *-- numData
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class CheckboxQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    + isRequired: Boolean
    + questionText: String
    # type = CHECKBOX
    # additionalData: [Option]
  }

  class MultChoiceQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    + isRequired: Boolean
    + questionText: String
    # type = MULT_CHOICE
    # additionalData: [Option]
  }

  class Option {
    + id: String
    + value: String
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class CheckboxGridQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    + isRequired: Boolean
    + questionText: String
    # type = CHECKBOX_GRID
    # additionalData: Object
  }

  class "additionalData" as cbGridData {
    + rowQuestions: [RowQuestion]
    + options: [Option]
    + isAllRequired: Boolean
  }

  class MultChoiceGridQuestion<Extends Question> {
    ~ isOneToOne: Boolean
    ..//Inherited from// Question..
    + isRequired: Boolean
    + questionText: String
    # type = MULT_CHOICE_GRID
    # additionalData: Object
  }

  class "additionalData" as mcGridData {
    + rowQuestions: [RowQuestion]
    + options: [Option]
    + isAllRequired: Boolean
  }

  class RowQuestion {
    + id: String
    + questionText: String
  }

  CheckboxGridQuestion *-- cbGridData
  MultChoiceGridQuestion *-- mcGridData
@enduml
```

## Client-side

### Classes

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class Survey {
    + surveyId: hex String
    + surveyVersion: Integer
    + title: String
    + description: String
    + isActive: Boolean
    + questions: [Question]
    --
    + Survey(
      \t title: String,
      \t description: String,
      \t isActive: Boolean,
      \t questions: [Question],
      \t [surveyId = ""null"": hex String],
      \t [surveyVersion = ""null"": Integer]
      )
  }

  class Question <<Abstract>> {
    # {abstract} questionType: enum QuestionType
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    + Question(\n\tquestionType: enum QuestionType,\n\tisRequired: Boolean,\n\tquestionText: String\n\tid: hex String\n)
  }

  class NumberQuestion<Extends Question> {
    ~ min: Number
    ~ max: Number
    ~ step: Number
    ..//Inherited from// Question..
    # questionType = NUMBER
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + NumberQuestion(\n\tisRequired: Boolean,\n\tquestionText: String,\n\t[min = ""null"": Number],\n\t[max = ""null"": Number],\n\t[step = ""null"": Number],\n\t[questionId = ""null"": hex String],\n)
  }

  class ShortAnswerQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    # questionType = SHORT_ANSWER
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + ShortAnswerQuestion(\n\tisRequired: Boolean,\n\tquestionText: String,\n\t[questionId = ""null"": hex String],\n)
  }

  class LongAnswerQuestion<Extends Question> {
    //No members unique to this class//
    ..//Inherited from// Question..
    # questionType = LONG_ANSWER
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + LongAnswerQuestion(\n\tisRequired: Boolean,\n\tquestionText: String,\n\t[questionId = ""null"": hex String],\n)
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class Option {
    + optionText: String
    + isSelected: Boolean
    + id: hex String
    + Option(\n\toptionText: String,\n\t[isSelected = false],\n\t[optionId = ""null"": hex String]\n)
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class CheckboxQuestion<Extends Question> {
    + options: [Option]
    ..//Inherited from// Question..
    # questionType = CHECKBOX
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + CheckboxQuestion(\n\tisRequired: Boolean,\n\tquestionText: String,\n\toptions: [Option],\n\t[questionId = ""null"": hex String]\n)
  }

  class MultChoiceQuestion<Extends Question> {
    + options: [Option]
    ..//Inherited from// Question..
    # questionType = MULT_CHOICE
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + MultChoiceQuestion(\n\tisRequired: Boolean,\n\tquestionText: String,\n\toptions: [Option],\n\t[questionId = ""null"": hex String]\n)
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class RowQuestion {
    + questionText: String
    + id: hex String
    + RowQuestion(\n\tquestionText: String,\n\t[id = ""null"": hex String]\n)
  }

  class GridQuestion<Extends Question> <<Abstract>> {
    + rowQuestions: [RowQuestion]
    + options: [Option]
    ..//Inherited from// Question..
    # {abstract} questionType: enum QuestionType
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    # {abstract} GridQuestion(\n\tquestionType: enum QuestionType,\n\tisRequired: Boolean,\n\tmainQuestionText: String,\n\trowQuestions: [RowQuestion],\n\toptions: [Option],\n\tid: hex String\n)
  }

  class CheckboxGridQuestion extends GridQuestion {
    //No members unique to this class//
    ..//Inherited from// GridQuestion..
    + rowQuestions: [RowQuestion]
    + options: [Option]
    ..//Inherited from// Question..
    # questionType = CHECKBOX_GRID
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + CheckboxGridQuestion(
      \t isRequired: Boolean,
      \t mainQuestionText: String,
      \t rowQuestions: [RowQuestion],
      \t options: [Option],
      \t [id = ""null"": hex String]
      )
  }

  class MultChoiceGridQuestion extends GridQuestion {
    + isOneToOne: Boolean
    ..//Inherited from// GridQuestion..
    + rowQuestions: [RowQuestion]
    + options: [Option]
    ..//Inherited from// Question..
    # questionType = CHECKBOX_GRID
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + MultChoiceGridQuestion(
      \tisRequired: Boolean,
      \tmainQuestionText: String,
      \trowQuestions: [RowQuestion],
      \toptions: [Option],
      \tisOneToOne,
      \t[id = ""null"": hex String]\n)
  }
@enduml
```

### Creating a new Survey

We will try to implement survey creation in a similar way to Google Forms. More specifically, we will try to save progress to the server in frequent intervals as an admin creates the survey.

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 1.5
  hide circle

  participant SurveyAdminContext  as context
  participant LocalStorage        as dexie
  participant ServerAdapter       as adapter
  participant ServerFacade        as facade
  participant "Back-end"          as backend

  group If offline
    context -> dexie  : "db.admin.save()"
  end

  context -> adapter : createSurvey()
  adapter -> facade : createSurvey()
  facade -> backend : POST /api/v1/surveys
@enduml
```

### Current SurveyAdminContext structure

Features

- Edit stack to support undo/redo

Question types

- Short answer
- Multiple choice

Product types

- AdminItem
  - Preview
  - Editor
- Question
- State
- Reducer

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class EditState <<Abstract>> {
    # {abstract} questionType: enum QuestionType
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    + createChangeQType(): (State) => State
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class ShortAnswerEditState <Extends State>  {
    //No members unique to this class//
    ..//Inherited from// EditState..
    # questionType = SHORT_ANSWER
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + ShortAnswerEditState(
    \t isRequired: Boolean,
    \t questionText: String,
    \t [id = ""null"": hex String]
    )
    + createToggleIsRequired(): (ShortAnswerEditState) => ShortAnswerEditState
    + createSetQuestionText(newQuestionText: String): (ShortAnswerEditState) => ShortAnswerEditState
    ..//Inherited from// EditState..
    + createChangeQType(): (EditState) => EditState
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class NumberEditState <Extends EditState>  {
    //No members unique to this class//
    ..//Inherited from// EditState..
    # questionType = SHORT_ANSWER
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + NumberEditState(
    \t isRequired: Boolean,
    \t questionText: String,
    \t [id = ""null"": hex String]
    )
    + createToggleIsRequired(): (NumberEditState) => NumberEditState
    + createSetQuestionText(newQuestionText: String): (NumberEditState) => NumberEditState
    ..//Inherited from// EditState..
    + createChangeQType(): (EditState) => EditState
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class LongAnswerEditState <Extends EditState>  {
    //No members unique to this class//
    ..//Inherited from// EditState..
    # questionType = LONG_ANSWER
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + LongAnswerEditState(
    \t isRequired: Boolean,
    \t questionText: String,
    \t [id = ""null"": hex String]
    )
    + createToggleIsRequired(): (LongAnswerEditState) => LongAnswerEditState
    + createSetQuestionText(newQuestionText: String): (LongAnswerEditState) => LongAnswerEditState
    ..//Inherited from// EditState..
    + createChangeQType(): (EditState) => EditState
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class MultChoiceEditState <Extends EditState> {
    + options: [Option]
    ..//Inherited from// EditState..
    # questionType = MULT_CHOICE
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + MultChoiceEditState(
    \t isRequired: Boolean,
    \t questionText: String,
    \t [options = ""null"": [Option]],
    \t [id = ""null"": hex String]
    )
    + createSetQuestionText(newQuestionText: String): (MultChoiceEditState) => MultChoiceEditState
    + createToggleIsRequired(): (MultChoiceEditState) => MultChoiceEditState
    ..Option mutators..
    + createAddOption(): (MultChoiceEditState) => MultChoiceEditState
    + createEditOptionText(optText: String, optId: hex String): (MultChoiceEditState) => MultChoiceEditState
    + createMoveUpOption(optId: hex String): (MultChoiceEditState) => MultChoiceEditState
    + createMoveDownOption(optId: hex String): (MultChoiceEditState) => MultChoiceEditState
    + createDeleteOption(optId: hex String): (MultChoiceEditState) => MultChoiceEditState
    ..//Inherited from// EditState..
    + createChangeQType(): (EditState) => EditState
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class CheckboxEditState <Extends EditState> {
    + options: [Option]
    ..//Inherited from// EditState..
    # questionType = CHECKBOX
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + CheckboxEditState(
    \t isRequired: Boolean,
    \t questionText: String,
    \t [options = ""null"": [Option]],
    \t [id = ""null"": hex String]
    )
    + createToggleIsRequired(): (CheckboxEditState) => CheckboxEditState
    + createSetQuestionText(newQuestionText: String): (CheckboxEditState) => CheckboxEditState
    ..Option mutators..
    + createAddOption(): (CheckboxEditState) => CheckboxEditState
    + createEditOptionText(optText: String, optId: hex String): (CheckboxEditState) => CheckboxEditState
    + createMoveUpOption(optId: hex String): (CheckboxEditState) => CheckboxEditState
    + createMoveDownOption(optId: hex String): (CheckboxEditState) => CheckboxEditState
    + createDeleteOption(optId: hex String): (CheckboxEditState) => CheckboxEditState
    ..//Inherited from// EditState..
    + createChangeQType(): (EditState) => EditState
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class CheckboxGridEditState <Extends EditState> {
    + rowQuestions: [RowQuestion]
    + options: [Option]
    ..//Inherited from// State..
    # questionType = CHECKBOX_GRID
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + CheckboxGridEditState(
    \t isRequired: Boolean,
    \t mainQuestionText: String,
    \t [rowQuestions = ""null"": [RowQuestion]],
    \t [options = ""null"": [Option]],
    \t [id = ""null"": hex String]
    )
    + createToggleIsRequired(): (CheckboxGridEditState) => CheckboxGridEditState
    + createSetQuestionText(newQuestionText: String): (CheckboxGridEditState) => CheckboxGridEditState
    ..Option manipulators..
    + createAddOption(): (CheckboxGridEditState) => CheckboxGridEditState
    + createEditOptionText(optText: String, optId: hex String): (CheckboxGridEditState) => CheckboxGridEditState
    + createMoveUpOption(optId: hex String): (CheckboxGridEditState) => CheckboxGridEditState
    + createMoveDownOption(optId: hex String): (CheckboxGridEditState) => CheckboxGridEditState
    + createDeleteOption(optText: String): (CheckboxGridEditState) => CheckboxGridEditState
    ..Row question manipulators..
    + createAddRow(): (CheckboxGridEditState) => CheckboxGridEditState
    + createEditRowText(rowText: String, optId: hex String): (CheckboxGridEditState) => CheckboxGridEditState
    + createMoveUpRow(rowId: hex String): (CheckboxGridEditState) => CheckboxGridEditState
    + createMoveDownRow(rowId: hex String): (CheckboxGridEditState) => CheckboxGridEditState
    + createDeleteRow(rowId: hex String): (CheckboxGridEditState) => CheckboxGridEditState
    ..//Inherited from// EditState..
    + createChangeQType(): (EditState) => EditState
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam participantBorderThickness 1.5
  skinparam participantFontStyle bold
  skinparam sequenceGroupBorderThickness 1.5
  skinparam sequenceLifeLineBorderThickness 1.7
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class MultChoiceGridEditState <Extends EditState> {
    + isOneToOne: Boolean
    + rowQuestions: [RowQuestion]
    + options: [Option]
    ..//Inherited from// EditState..
    # questionType = MULT_CHOICE_GRID
    + isRequired: Boolean
    + questionText: String
    + id: hex String
    --
    + MultChoiceGridEditState(
    \t isRequired: Boolean,
    \t mainQuestionText: String,
    \t isOneToOne: Boolean,
    \t [rowQuestions = ""null"": [RowQuestion]],
    \t [options = ""null"": [Option]],
    \t [id = ""null"": hex String]
    )
    + createToggleIsRequired(): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createToggleIsOneToOne(): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createSetQuestionText(newQuestionText: String): (MultChoiceGridEditState) => MultChoiceGridEditState
    ..Option manipulators..
    + createAddOption(): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createEditOptionText(optText: String, optId: hex String): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createMoveUpOption(optId: hex String): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createMoveDownOption(optId: hex String): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createDeleteOption(optText: String): (MultChoiceGridEditState) => MultChoiceGridEditState
    ..Row question manipulators..
    + createAddRow(): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createEditRowText(rowText: String, optId: hex String): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createMoveUpRow(rowId: hex String): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createMoveDownRow(rowId: hex String): (MultChoiceGridEditState) => MultChoiceGridEditState
    + createDeleteRow(rowId: hex String): (MultChoiceGridEditState) => MultChoiceGridEditState
    ..//Inherited from// EditState..
    + createChangeQType(): (EditState) => EditState
  }
@enduml
```

```plantuml
@startuml
  skinparam shadowing false
  skinparam roundcorner 9
  skinparam monochrome true
  skinparam classBorderThickness 1.5
  skinparam classFontStyle bold
  skinparam ArrowThickness 2
  skinparam tabsize 3
  hide circle

  class "**Reducer**" as Reducer <<Abstract>> {
    + questionId: hex String
    + reduce(currentState: Object): State
  }

  class ShortAnswerReducer {
    + response: String
    ..//Inherited from// Reducer..
    + questionId: hex String
    + reduce(currentState: Object): ShortAnswerEditState
  }

  class MultChoiceReducer {
    + selectedOptId: hex String
    ..//Inherited from// Reducer..
    + questionId: hex String
    + reduce(currentState: Object): MultChoiceEditState
  }

  Reducer <|-- MultChoiceReducer
  Reducer <|-- ShortAnswerReducer
@enduml
```
