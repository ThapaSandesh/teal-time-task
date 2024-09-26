<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Member;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('query');
        $members = DB::table('members');
        if (!is_null($query) && $query !== '') {
            $members->where('name', 'like', '%' . $query . '%')
                ->orderBy('id', 'desc');
            return response(['data' => $members->paginate(10)], 200);
        }
        return response(['data' => $members], 200);

    }
    public function store(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $fields = $request->all();
            $errors = Validator::make($fields, [
                'name' => 'required',
                'email' => 'required|email',

            ]);

            if ($errors->fails()) {
                return response($errors->errors()->all(), 422);
            }

            $member = Member::create([
                'name' => $fields['name'],
                'email' => $fields['email'],

            ]);
            return response(['message' => 'member created'], 200);
        });
    }

    public function update(Request $request)
    {
        $fields = $request->all();
        $errors = Validator::make($fields, [
            'id' => 'required|numeric',
            'name' => 'required',
            'email' => 'required',

        ]);
        if ($errors->fails()) {
            return response($errors->errors()->all(), 422);
        }

        $member = Member::where('id', $fields['id'])->update([
            'name' => $fields['name'],
            'email' => $fields['email'],
        ]);

        return response(['message' => 'member updated'], 200);
    }
}
