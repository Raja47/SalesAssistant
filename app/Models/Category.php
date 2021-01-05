<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TypiCMS\NestableTrait;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Category extends Model
{
    use SoftDeletes,NestableTrait;

    protected $table = "resource_categories";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'title' ,'slug','parent_id','status'  
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'status'  => 'boolean'
    ];
    
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

   
    
}
