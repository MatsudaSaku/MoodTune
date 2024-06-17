<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journaling extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "title",
        "content",
    ];

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
