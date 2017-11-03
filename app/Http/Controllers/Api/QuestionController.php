<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Resources\Question as QuestionResource;
use App\Question;
use Illuminate\Http\Request;

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
        $question = Question::create([
            'value' => $request->question
        ]);

        $answers = collect($request->answers)->map(function ($answer) use($question) {
            return $question->answers()->create([
                'question_id' => $question->id,
                'value' => $answer
            ]);
        });

        return $this->respondOk(new QuestionResource($question));
    }

    public function show($id)
    {
        $question = Question::find($id);

        if (is_null($question)) return $this->respondNotFound('Question does not exist');

        return $this->respondOk(new QuestionResource($question));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
