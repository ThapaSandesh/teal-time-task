<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Str;
use Illuminate\Http\Request;
use App\Models\User;
use App\Events\NewUserCreated;

class AuthController extends Controller
{
    private $secretKey = "qQKPjndxljuYQi/POiXJa8O19nVO/vTf/DpXO541g=qQKPjndxljuYQi/POiXJa8O19nVO/vTf/DpXO541g=";
    public function register(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|max:8',
        ]);
        if ($errors->fails()) {
            return response($errors->errors()->all(), 422);
        }

        $user = User::create([
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'isValidEmail' => User::IS_INVALID_EMAIL,
            'remember_token' => $this->generateRandomCode()
        ]);
        // dd($user);
        NewUserCreated::dispatch($user);
        return response(['user' => $user, 'message' => 'user created'], 200);
    }

    public function validEmail($token)
    {
        User::where('remember_token', $token)->update(['isValidEmail' => User::IS_VALID_EMAIL]);
        return redirect('/app/login');
    }

    public function login(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($errors->fails()) {
            return response($errors->errors()->all(), 422);
        }

        $user = User::where('email', $fields['email'])->first();
        if (!is_null($user)) {
            if (intval($user->isValidEmail) !== User::IS_VALID_EMAIL) {
                NewUserCreated::dispatch($user);
                return response([
                    'message' => 'Email Not Verified Yet. We have resend the verification email please check your email' . $user->email,
                    'isLoggedIn' => false,
                ],422);
            }
        }

        if (!$user || !Hash::check($fields['password'],$user->password)) {
            return response([
                'message' => 'email or password invalid',
                'isLoggedIn' => false,
            ], 422);
        }
        // dd($user);
        $token = $user->createToken($this->secretKey)->plainTextToken;
        return response(
            [
                'user' => $user,
                'message' => 'Loggedin Successfully',
                'token' => $token,
                'isLoggedIn' => true,
            ],
            200
        );
    }


    function generateRandomCode()
    {

        $code = Str::random(10) . time();
        return $code;
    }


}
