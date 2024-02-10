<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    </head>
    <body>
        <!-- As a link -->



        <div class="container">
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#">Home</a>
                </div>
            </nav>
                <div class="container-xxl">
                    <div class="row">
                        <div class="col-md-6">
                            <div id="records">
                                <table class="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-body">
                                    <form id="userform" method="post" action="{{ route('store')}}" enctype="multipart/form-data">
                                        @csrf
                                        <div class="mb-3">
                                            <label for="formGroupExampleInput" class="form-label">Name</label>
                                            <input type="text" name="name" id="name" class="form-control" id="formGroupExampleInput" placeholder="Name">
                                        </div>
                                        <div class="mb-3">
                                            <label for="formGroupExampleInput2" class="form-label">Address</label>
                                            <input type="text" name="address" id="address" class="form-control" id="formGroupExampleInput2" placeholder="Address">
                                        </div>
                                        <div class="mb-3">
                                            <label for="formGroupExampleInput2" class="form-label">Gender</label>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" id="male" value="male" checked>
                                                <label class="form-check-label" for="exampleRadios1">
                                                  Male
                                                </label>
                                              </div>
                                              <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" id="female" value="female">
                                                <label class="form-check-label" for="exampleRadios2">
                                                  Female
                                                </label>
                                              </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="formGroupExampleInput2" class="form-label">Uplod Image</label>
                                            <input type="file" class="form-control-file" id="image">
                                        </div>
                                        <p id="errormsg"></p>
                                        <div class="mb-3">

                                            <button type="submit" class="btn btn-primary" id="exampleFormControlFile1">Save</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <script>


        </script>

        <script src="{{ asset('custom.js') }}"></script>
    </body>
</html>
