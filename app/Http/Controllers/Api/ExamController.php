<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\StoreExamRequest;
use App\Http\Resources\Exam as ExamResource;
use App\Models\Exam;

class ExamController extends ApiController
{
    public function index()
    {
        return $this->respondOk(ExamResource::collection(Exam::all()));
    }

    public function store(StoreExamRequest $request)
    {
        $exam = Exam::create($request->all());

        return $this->respondOk(new ExamResource($exam));
    }

    public function show(Exam $exam)
    {
        if (is_null($exam)) return $this->respondNotFound('Exam does not exist');

        return $this->respondOk(new ExamResource($exam));
    }

    public function update(StoreExamRequest $request, Exam $exam)
    {
        $exam->update($request->all());

        return $this->respondOk(new ExamResource($exam));
    }

    public function destroy(Exam $exam)
    {
        $exam->delete();

        return $this->respondOk($exam);
    }
}
