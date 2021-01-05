<?php
namespace App\Providers;


use App\Contracts\CategoryContract;
use App\Contracts\KeywordContract;
use App\Contracts\ResourceContract;
use App\Repositories\CategoryRepository;

use App\Repositories\ResourceRepository;
use App\Repositories\KeywordRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected $repositories = [
        CategoryContract::class   =>  CategoryRepository::class,
        KeywordContract::class   =>  KeywordRepository::class,
        ResourceContract::class   =>  ResourceRepository::class,
    ];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        foreach ($this->repositories as $interface => $implementation)
        {
            $this->app->bind($interface, $implementation);
        }
    }
}

