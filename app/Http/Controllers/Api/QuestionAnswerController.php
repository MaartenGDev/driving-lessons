<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\StoreQuestionRequest;
use App\Question;

class QuestionAnswerController extends ApiController
{
    public function store(Question $question, StoreQuestionRequest $request)
    {
        $correctAnswers = $this->getValues($question->answers);
        $providedAnswers = $this->getValues($request->answers);

        return $this->respondOk([
            'failedFields' => $correctAnswers->diff($providedAnswers)
        ]);
    }

    protected function getValues($answers){
        return collect($answers)->map(function ($answer) {
            return $answer['value'];
        });
    }
}
