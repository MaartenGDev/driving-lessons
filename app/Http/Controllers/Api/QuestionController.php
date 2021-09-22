<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Resources\Question as QuestionResource;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Monolog\Logger;

class QuestionController extends ApiController
{
    public function index()
    {
        return $this->respondOk(QuestionResource::collection(Question::all()));
    }

    public function store(StoreQuestionRequest $request)
    {
        $question = Question::create($request->all());

        $question->answers()->createMany($this->toValueArray($request->answers));

        return $this->respondOk(new QuestionResource($question));
    }

    public function show(Question $question)
    {
        if (is_null($question)) return $this->respondNotFound('Question does not exist');

        return $this->respondOk(new QuestionResource($question));
    }

    public function update(StoreQuestionRequest $request, Question $question)
    {
        $question->answers()->delete();
        $question->answers()->createMany($this->toValueArray($request->answers));
        $question->update($request->all());

        return $this->respondOk(new QuestionResource($question));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Question $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->answers()->delete();
        $question->delete();

        return $this->respondOk($question);
    }

    protected function toValueArray($answers){
       return collect($answers)->map(function ($answer) {
           return ['value' => $answer['value']];
       })->toArray();
    }
}
