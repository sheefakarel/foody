<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', ['uses' => 'ApiController@index']);
Route::get('/healthcheck', ['uses' => 'ApiController@healthcheck']);

Route::get('/users', ['uses' => 'UserController@index']);
Route::get('/users/{userId}', ['uses' => 'UserController@show']);

Route::get('/users/{userId}/foods', ['uses' => 'UserFoodController@foods']);
Route::get('/users/{userId}/foods/{foodId}', ['uses' => 'UserFoodController@food']);
Route::put('/users/{userId}/foods/{foodId}', ['uses' => 'UserFoodController@addFood']);
Route::delete('/users/{userId}/foods/{foodId}', ['uses' => 'UserFoodController@deleteFood']);

Route::get('/foods', ['uses' => 'FoodController@index']);
Route::get('/foods/{foodId}', ['uses' => 'FoodController@show']);

Route::get('/users/{userId}/reports/most-consumed-nutrient', ['uses' => 'UserFoodController@mostConsumed']);
