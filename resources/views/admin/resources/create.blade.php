@extends('admin.app')
@section('title') {{ $pageTitle }} @endsection
@section('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset('backend/js/plugins/dropzone/dist/min/dropzone.min.css') }}"/>
@endsection
@section('content')
    <div class="app-title">
        <div>
            <h1><i class="fa fa-shopping-bag"></i> {{ $pageTitle }} - {{ $subTitle }}</h1>
        </div>
    </div>
    @include('admin.partials.flash')
    
    
    <div class="row user">
        <div class="col-md-3">
            <div class="tile p-0">
                <ul class="nav flex-column nav-tabs user-tabs">
                    <li class="nav-item"><a class="nav-link active" href="#general" data-toggle="tab">General</a></li>
                </ul>
            </div>
        </div>
        <div class="col-md-9">
            <div class="tab-content">
                <div class="tab-pane active" id="general">
                    <div class="tile">
                        <form action="{{ route('admin.resources.store') }}" method="POST" role="form">
                            @csrf
                            <h3 class="tile-title">Resource Information</h3>
                            <hr>
                            <div class="tile-body">
                               
                                
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label" for="categories">Category*</label>
                                            <select name="resource_category_id" id="categories" class="form-control" placeholder="select category or domain">
                                                <option value="">Select Domain or Industry<option>
                                                @foreach($categories as $category)
                                                    @if($category->parent){
                                                    <option value="{{ $category->id }}">{{ $category->title }}</option>
                                                    }
                                                    @endif
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                    
                               
                                
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label" for="tags">Industry / Domain</label>
                                            <select name="keywords[]" id="keywords" class="form-control" multiple>
                                                @foreach($keywordsOrDomain as $keyword)
                                                <option value="{{ $keyword->title }}" >{{ $keyword->title }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                                               
                                
                            </div>
                           
                        </form>
                    </div>
                </div>
            
        
                <div class="tab-pane active" id="images">
                    <div class="tile">
                        <h3 class="tile-title">Upload Image</h3>
                        <hr>
                        <div class="tile-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <form action="" class="dropzone" id="dropzone" style="border: 2px dashed rgba(0,0,0,0.3)">
                                        <input type="hidden" name="resource_id" value="{{ '1' }}" >
                                        
                                        {{ csrf_field() }}
                                    </form>
                                </div>
                            </div>
                            <div class="row d-print-none mt-2">
                                <div class="col-12 text-right">
                                    <button class="btn btn-success" type="button" id="uploadButton">
                                        <i class="fa fa-fw fa-lg fa-upload"></i>Upload Resources
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script type="text/javascript" src="{{ asset('backend/js/plugins/select2.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('backend/js/plugins/dropzone/dist/min/dropzone.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('backend/js/plugins/bootstrap-notify.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('backend/js/app.js') }}"></script>
    <script>
        Dropzone.autoDiscover = false;

        $( document ).ready(function() {
           
                                               
             $("#keywords").select2({
                tags: true,
                tokenSeparators: [',']
            });
            
             $('#resource_cat_id').on('change',function (){

             });

            let myDropzone = new Dropzone("#dropzone", {
                paramName: "image",
                addRemoveLinks: false,
                maxFilesize: 300,
                acceptedFiles:'image/*',
                parallelUploads: 10,
                uploadMultiple: true,
                timeout:30000,
                url: "{{ route('admin.resources.images.upload') }}",
                autoProcessQueue: false,
                init: function () {
                  this.on("success", function (file, responseText) {
                    console.log(responseText.img);
                  });
                }
            });

            myDropzone.on("queuecomplete", function (file) {
                // window.location.reload();
                showNotification('Completed', 'All product images uploaded', 'success', 'fa-check');
                
                setTimeout(function(){ location.reload(); }, 3000);
                
            });
            
            $('#uploadButton').click(function(){
                
                var categories =  $('#categories').val();
                var keywords   =  $('#keywords').val();

                if (myDropzone.files.length === 0 || categories == '' ||  categories == null || keywords == '' ||  keywords == null) {
                    showNotification('Error', 'Please select files to upload.', 'danger', 'fa-close');
                } else {
                    myDropzone.processQueue();
                }
            
            });

            myDropzone.on('sending', function(data, xhr, formData){
                
                formData.append('resource_category_id', $('#categories').val() );
                formData.append('keywords', $('#keywords').val() );
            });
            function showNotification(title, message, type, icon)
            {
                $.notify({
                    title: title + ' : ',
                    message: message,
                    icon: 'fa ' + icon
                },{
                    type: type,
                    allow_dismiss: true,
                    placement: {
                        from: "top",
                        align: "right"
                    },
                });
            }



           
        });



    </script>
@endpush