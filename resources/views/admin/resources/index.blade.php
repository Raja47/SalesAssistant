@extends('admin.app')
@section('title') {{ $pageTitle }} @endsection
@section('content')
    <div class="app-title">
        <div>
            <h1><i class="fa fa-shopping-bag"></i> {{ $pageTitle }}</h1>
            <p>{{ $subTitle }}</p>
        </div>
        <a href="{{ route('admin.resources.create') }}" class="btn btn-primary pull-right">Add resource</a>
    </div>
    @include('admin.partials.flash')
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <table class="table table-hover table-bordered" id="sampleTable">
                        <thead>
                        <tr>
                            <th> # </th>
                            <th class="text-center"> Keywords </th>
                            <th class="text-center"> Category </th>
                            <th class="text-center"> Image </th>
                            <th class="text-center"> Status   </th>

                            <th style="width:100px; min-width:100px;" class="text-center text-danger"><i class="fa fa-bolt"> </i></th>
                        </tr>
                        </thead>
                        <tbody>
                            @php $count=1; @endphp
                            @foreach($resources as $resource)
                                @php $count++; @endphp
                                <tr>
                                    <td class="text-center">{{ $count }}</td>
                        
                                    <td class="text-center">
                                    @if($resource->keywords)
                                    
                                        @foreach($resource->keywords as $keyword)
                                            
                                            {{ $keyword }}
                                        
                                        @endforeach

                                                    
                                    @endif
                                    </td>
                                    
                                    <td class="text-center">{{ $resource->category->title }}</td>
                                    
                                    <td class="text-center"> <img width="150px" height="100px" src="{{ asset('storage/resources/images/small/'.optional($resource->images->first())->url) }}"> </td>

                                    <td class="text-center">
                                        @if ($resource->status == 1)
                                            <span class="badge badge-success">Active</span>
                                        @else
                                            <span class="badge badge-danger">Not Active</span>
                                        @endif
                                    </td>
                                    <td class="text-center">
                                        <div class="btn-group" role="group" aria-label="Second group">
                                            <a href="{{ route('admin.resources.edit', $resource->id) }}" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></a>
                                            <a href="{{ route('admin.resources.delete', $resource->id) }}" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></a>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script type="text/javascript" src="{{ asset('backend/js/plugins/jquery.dataTables.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('backend/js/plugins/dataTables.bootstrap.min.js') }}"></script>
    <script type="text/javascript">$('#sampleTable').DataTable();</script>
@endpush
