<?php

namespace App\Http\Controllers\Cms;

use App\Traits\UploadAble;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Contracts\ResourceContract;
use App\Http\Controllers\Controller;
use ImageLib;
use Illuminate\Support\Str;
use App\Models\Resource;



class ImageController extends Controller
{
    use UploadAble;

    protected $resourceRepository;

    public function __construct(ResourceContract $resourceRepository)
    {
        $this->resourceRepository = $resourceRepository;
    }

    public function upload(Request $request)
    {
        
        if ( $request->has('image')) {
            foreach($request->image as $image){
           
                $resource = new Resource();
                $resource->resource_category_id =  $request->resource_category_id;
                        
                
                $keywords           =  explode( ',' , $request->keywords );
                $keywords[]         = 'All industries';
                $resource->keywords = $keywords;
                $resource->demo_url = $request->demo_url;
                $resource->save();

                if($resource){
                    $fileName = Str::random(3).'-'.$resource->id;
                    $file  = $fileName.'.'.$image->getClientOriginalExtension();

                    $originalImage = ImageLib::make($image);
                    
                    $originalImage->encode($image->getClientOriginalExtension() ,100);
                    \Storage::disk('public')->put( 'resources/images/original/'.$file , $originalImage );

                    $smallImage = ImageLib::make($image)->resize(300,300, function ($constraint) { $constraint->aspectRatio(); } )
                      ->encode($image->getClientOriginalExtension() , 100);

                    \Storage::disk('public')->put( 'resources/images/small/'.$file , $smallImage );

                    $mediumImage = ImageLib::make($image)->resize(800,500, function ($constraint) { $constraint->aspectRatio(); } )
                      ->encode($image->getClientOriginalExtension() , 100);
                    
                    \Storage::disk('public')->put( 'resources/images/medium/'.$file , $mediumImage );

                    $resourceImage = new Image([  
                        'url'      =>  $file ,
                        'imageable_type' => 'App\Models\Resource',
                        'imageable_id'   => $resource->id
                    ]);
                    
                    $resource->images()->save($resourceImage);
                }
            }
            
        }
        return response()->json(['status' => 'Success']);
    }


    public function show()
    {
        echo "hi";

      $img = asset('storage/resources/Sq7qm3nMvR3FiTr9bmaiJWtHP.jpg');

      $img = Image::make($img);



    }    


    public function delete($id)
    {
        $image = Image::findOrFail($id);

        if ($image->full != '') {
            $this->deleteOne($image->url);
        }
        $image->delete();

        return redirect()->back();
    }

    public function imageScrap(){
        
       

        $url = "http://www.panam-mask.com/";

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        //for debug only!
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $resp = curl_exec($curl);
        curl_close($curl);
            
        // echo $resp;
        // die();
        return view( 'admin.resources.imagescrap' , compact('resp') ); 
    }    

}