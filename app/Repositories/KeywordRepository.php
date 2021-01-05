<?php

namespace App\Repositories;

use App\Models\Keyword;
use App\Traits\UploadAble;
use Illuminate\Http\UploadedFile;
use App\Contracts\KeywordContract;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Doctrine\Instantiator\Exception\InvalidArgumentException;
use App\Repositories\BaseRepository;
/**
 * Class KeywordRepository
 *
 * @package \App\Repositories
 */
class KeywordRepository extends BaseRepository implements KeywordContract
{
    use UploadAble;

    /**
     * KeywordRepository constructor.
     * @param Keyword $model
     */
    public function __construct(Keyword $model)
    {
        parent::__construct($model);
        $this->model = $model;
    }

    /**
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return mixed
     */
    public function listKeywords(string $order = 'id', string $sort = 'desc', array $columns = ['*'])
    {
        return $this->all($columns, $order, $sort);
    }

    /**
     * @param int $id
     * @return mixed
     * @throws ModelNotFoundException
     */
    public function findKeywordById(int $id)
    {
        try {
            return $this->findOneOrFail($id);

        } catch (ModelNotFoundException $e) {

            throw new ModelNotFoundException($e);
        }

    }

    /**
     * @param array $params
     * @return Keyword|mixed
     */
    public function createKeyword(array $params)
    {
        try {
            $collection = collect($params);

            $Keyword = new Keyword($collection->all());

            $Keyword->save();

            return $Keyword;

        } catch (QueryException $exception) {
            throw new InvalidArgumentException($exception->getMessage());
        }
    }

    /**
     * @param array $params
     * @return mixed
     */
    public function updateKeyword(array $params)
    {
        $Keyword = $this->findKeywordById($params['id']);

        $collection = collect($params)->except('_token');
        $Keyword->update($collection->all());

        return $Keyword;
    }

    /**
     * @param $id
     * @return bool|mixed
     */
    public function deleteKeyword($id)
    {
        $Keyword = $this->findKeywordById($id);

        $Keyword->delete();

        return $Keyword;
    }


    public function findBySlug($slug)
    {   
            return Keyword::where('slug', $slug)->first();
    }
}
