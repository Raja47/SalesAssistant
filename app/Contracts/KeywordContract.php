<?php

namespace App\Contracts;

/**
 * Interface KeywordContract
 * @package App\Contracts
 */
interface KeywordContract
{
    /**
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return mixed
     */
    public function listKeywords(string $order = 'id', string $sort = 'desc', array $columns = ['*']);

    /**
     * @param int $id
     * @return mixed
     */
    public function findKeywordById(int $id);

    /**
     * @param array $params
     * @return mixed
     */
    public function createKeyword(array $params);

    /**
     * @param array $params
     * @return mixed
     */
    public function updateKeyword(array $params);

    /**
     * @param $id
     * @return bool
     */
    public function deleteKeyword($id);

    /**
     * @param $slug
     * @return mixed
     */
    public function findBySlug($slug);
}
