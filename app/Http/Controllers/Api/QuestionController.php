<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Resources\Question as QuestionResource;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Monolog\Logger;

class QuestionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->respondOk(QuestionResource::collection(Question::all()));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function store(StoreQuestionRequest $request)
    {
        $question = Question::create($request->all());

        $answers = collect($request->answers)->map(function ($answer) use($question) {
            return $question->answers()->create([
                'value' => $answer['value']
            ]);
        });

        return $this->respondOk(new QuestionResource($question));
    }

    public function show(Question $question)
    {
        if (is_null($question)) return $this->respondNotFound('Question does not exist');

        return $this->respondOk(new QuestionResource($question));
    }

    public function update(StoreQuestionRequest $request, Question $question)
    {
        $question->update($request->all());

        return $this->respondOk(new QuestionResource($question));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->answers()->delete();
        $question->delete();

        return $this->respondOk($question);
    }
}
