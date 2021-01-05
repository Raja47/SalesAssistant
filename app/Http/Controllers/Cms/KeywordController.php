<?php

namespace App\Http\Controllers\Cms;

use Illuminate\Http\Request;
use App\Contracts\KeywordContract;
use App\Http\Controllers\BaseController;
use App\Models\Keyword;

/**
 * Class KeywordController
 * @package App\Http\Controllers\Admin
 */
class KeywordController extends BaseController
{
    /**
     * @var KeywordContract
     */
    protected $keywordRepository;

    /**
     * KeywordController constructor.
     * @param KeywordContract $keywordRepository
     */
    public function __construct(KeywordContract $keywordRepository)
    {
        $this->keywordRepository = $keywordRepository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $keywords = $this->keywordRepository->listKeywords();

        $this->setPageTitle('Keywords', 'List of all keywords');
        return view('admin.keywords.index', compact('keywords'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $this->setPageTitle('Keywords', 'Create Keyword');
        return view('admin.keywords.create');
        // $keywordss = ['All industries','Accounting & Financial' , 'Agriculture','Animal & Pet','Architectural','Art & Design','Attorney & Law','Automotive','Bar & Nightclub','Business & Consulting','Childcare','Cleaning & Maintenance','Communications','Community & Non-Profit','Computer','Construction','Cosmetics & Beauty','Dating','Education','Entertainment & The Arts','Environmental','Fashion','Floral','Food & Drink','Games & Recreational' ,'Industrial','Internet','Landscaping','Medical & Pharmaceutical','Photography','Physical Fitness','Political','Real Estate & Mortgage' ,'Religious' ,'Restaurant', 'Retail', 'Security', 'Spa & Esthetics','Sport','Technology','Travel & Hotel','Wedding Service'];
       
        // foreach($keywordss as $keywords){
        //      $keyword = new Keyword();
        //     $keyword->title = $keywords;
        //     $keyword->save();
        // }

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title'      =>  'required|unique:keywords|max:191',
        ]);

        $params = $request->except('_token');

        $keyword = $this->keywordRepository->createKeyword($params);

        if (!$keyword) {
            return $this->responseRedirectBack('Error occurred while creating keyword.', 'error', true, true);
        }
        return $this->responseRedirect('admin.keywords.index', 'Keyword added successfully' ,'success',false, false);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $keyword = $this->keywordRepository->findKeywordById($id);

        $this->setPageTitle('Keywords', 'Edit Keyword : '.$keyword->title);
        return view('admin.keywords.edit', compact('keyword'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'title'      =>  'required|max:191',
        ]);

        $params = $request->except('_token');

        $keyword = $this->keywordRepository->updateKeyword($params);

        if (!$keyword) {
            return $this->responseRedirectBack('Error occurred while updating keyword.', 'error', true, true);
        }
        return $this->responseRedirectBack('Keyword updated successfully' ,'success',false, false);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete($id)
    {
        $keyword = $this->keywordRepository->deleteKeyword($id);

        if (!$keyword) {
            return $this->responseRedirectBack('Error occurred while deleting keyword.', 'error', true, true);
        }
        return $this->responseRedirect('admin.keywords.index', 'Keyword deleted successfully' ,'success',false, false);
    }
}
