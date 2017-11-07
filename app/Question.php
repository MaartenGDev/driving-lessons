<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'value', 'exam_id'
    ];

    public function answers(){
        return $this->hasMany(Answer::class);
    }
}
