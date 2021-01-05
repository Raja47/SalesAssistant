<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/resource/search" , "Site\ResourceController@search" )->name('resourceSearch');
Route::get("/resource/suggest/{type}/{keywords}" , "Site\ResourceController@suggest" )->name('resourceSuggest');
Route::get("/resource/{id}" , "Site\ResourceController@show" )->name('site.resource.show');
Route::post("/feedback/email" , "Site\HomeController@feedbackEmail" )->name('site.feedback.email');

?>