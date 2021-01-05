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
                        <form action="{{ route('admin.resources.update') }}" method="POST" role="form">
                            @csrf
                            <h3 class="tile-title">Resource Information</h3>
                            <hr>
                            <div class="tile-body">

                                
                                    
                                    <input type="hidden" name="resource_id" value="{{ $resource->id }}">
                                    
                           

                                

                                    
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label" for="categories">Category</label>
                                            <select name="resource_category_id" id="categories" class="form-control" >
                                                @foreach($categories as $category)
                                                    
                                                    <option value="{{ $category->id }}">{{ $category->title }}</option>

                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                               
                               
                                
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label" for="keywords">Keywords/tags</label>
                                            <select type="hidden" name="keywords[]" id="keywords" class="form-control" multiple>
                                                @if($resource->keywords)
                                                    @foreach($resource->keywords as $keyword)
                                                        @if( $keyword == "All" ) 
                                                            <?php continue ?>
                                                        @endif
                                                        <option value="{{ $keyword }}" selected="selected"> {{ $keyword}} <option>
                                                    @endforeach
                                                @endif
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" id="status" name="status"
                                            {{ $resource->status == 1 ? 'checked' : '' }}
                                            />Status
                                        </label>
                                    </div>
                                </div>
                                
                                
                                
                            </div>
                            <div class="tile-footer">
                                <div class="row d-print-none mt-2">
                                    <div class="col-12 text-right">
                                        <button class="btn btn-success" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i>Update Resource</button>
                                        <a class="btn btn-danger" href="{{ route('admin.resources.index') }}"><i class="fa fa-fw fa-lg fa-arrow-left"></i>Go Back</a>
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
                                        <input type="hidden" name="resource_id" value="{{ $resource->id }}">
                                        {{ csrf_field() }}
                                    </form>
                                </div>
                            </div>
                            <div class="row d-print-none mt-2">
                                <div class="col-12 text-right">
                                    <button class="btn btn-success" type="button" id="uploadButton">
                                        <i class="fa fa-fw fa-lg fa-upload"></i>Upload Images
                                    </button>
                                </div>
                            </div>
                            @if ($resource->images)
                                <hr>
                                 <p><small>Note* Just upload new image to replace old one</small></p>
                                <h6>Uploaded Images </h6>
                                
                                <div class="row">
                                    @foreach($resource->images as $image)
                                        <div class="col-md-3">
                                            <div class="card">
                                                <div class="card-body">
                                                    <img src="{{ asset('storage/resources/images/small/'.$image->url) }}" id="brandLogo" class="img-fluid" alt="img">
                                                    <a class="card-link float-right text-danger" href="{{ route('admin.resources.images.delete', $image->id) }}">
                                                        <i class="fa fa-fw fa-lg fa-trash"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                    
                                </div>
                                
                            @endif
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
           
                                               
            var selected_category =  "{{ $resource->resource_category_id}}";
            $("#categories option[value='"+selected_category+"']").attr('selected','selected');     

             $("#keywords").select2({
                tags: true,
            });
          
          

            let myDropzone = new Dropzone("#dropzone", {
                paramName: "image",
                addRemoveLinks: false,
                maxFilesize: 100,
                acceptedFiles:'image/*',
                parallelUploads: 1,
                uploadMultiple: false,
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
                if (myDropzone.files.length === 0) {
                    showNotification('Error', 'Please select files to upload.', 'danger', 'fa-close');
                } else {
                    myDropzone.processQueue();
                }
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



            let fileDropzone = new Dropzone("#filedropzone", {
                paramName: "file",
                addRemoveLinks: false,
                maxFilesize: 1000,
                parallelUploads: 1,
                uploadMultiple: false,
                url: "{{ route('admin.resources.files.upload') }}",
                autoProcessQueue: false,
                timeout:0,
                init: function () {
                  this.on("success", function (file, responseText) {
                    showNotification('Completed', 'All product Files uploaded', 'success', 'fa-check');  
                    console.log(responseText.img);
                  });
                }
            });
            fileDropzone.on("queuecomplete", function (file) {
                // window.location.reload();
                
                
                setTimeout(function(){ location.reload(); }, 1500);
                
            });
            $('#uploadFileButton').click(function(){
                if (fileDropzone.files.length === 0) {
                    showNotification('Error', 'Please select files to upload.', 'danger', 'fa-close');
                } else {
                    fileDropzone.processQueue();
                }
            });
        });



    </script>
@endpush
