<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Category;
use App\Models\Keyword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {   
       $categories = Category::orderByRaw('-title ASC')->where('status',1)->where('deleted_at',null)
            ->get()
            ->nest()
            ->setIndent('|–– ')
            ->listsFlattened('title');

        $configCategories = [];
        foreach($categories as $key => $category){
             $configCategories[$category] = $key;
        }   
        config(['categories' => $configCategories ]);  
       
       // config([
       //      'categories' => Category::all([
       //          'title','id','status'
       //      ])->where('status',1)->where('deleted_at',null)
       //      ->keyBy('title') // key every setting by its name
       //      ->transform(function ($category) {
       //           return $category->id; // return only the value
       //      })
       //      ->toArray() // make it an array
       //  ]);

       config([
            'keywords' => Keyword::all([
                'title','slug','id','status'
            ])->where('status',1)->where('deleted_at',null)
            ->keyBy('title') // key every setting by its name
            ->transform(function ($keyword) {
                 return $keyword->title; // return only the value
            })
            ->toArray() // make it an array
        ]);
    }
}
