<?php

// namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\User;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Log;

// class AuthController extends Controller
// {
//     public function register(Request $request) {
//         $validated = $request->validate([
//             'name' => 'required',
//             'email' => 'required|email|unique:users',
//             'password' => 'required|min:6',
//             'role' => 'required|in:admin,student', 
//         ]);
//          // Log the role to check if it's coming from the frontend
//     Log::info('Received role:', ['role' => $validated['role']]);
//         $user = User::create([
//             'name' => $validated['name'],
//             'email' => $validated['email'],
//             'password' => Hash::make($validated['password']),
//             'role' => $validated['role'], // student/admin
//         ]);
//         return response()->json(['user' => $user], 201);
//     }
    
//     public function login(Request $request) {
//         $validated = $request->validate([
//             'email' => 'required|email',
//             'password' => 'required',
//         ]);
    
//         $user = User::where('email', $validated['email'])->first();
    
//         if (!$user || !Hash::check($validated['password'], $user->password)) {
//             return response()->json(['message' => 'Invalid credentials'], 401);
//         }
    
//         $token = $user->createToken('authToken')->plainTextToken;
    
//         return response()->json([
//             'token' => $token,
//             'user' => $user->only(['id', 'name', 'email', 'role']) // Include role in the response
//         ]);
//     }


//     public function updateProfile(Request $request) {
//         $validated = $request->validate([
//             'school' => 'nullable|string|max:255',
//             'address' => 'nullable|string|max:255',
//             'age' => 'nullable|integer|min:1|max:120',
//             'gender' => 'nullable|in:male,female',
//         ]);
    
//         $user = $request->user(); // Get the logged-in user
//         $user->update($validated);
    
//         return response()->json([
//             'message' => 'Profile updated successfully',
//             'user' => $user,
//         ]);
//     }
    
    
    
    
//     public function logout(Request $request) {
//         $request->user()->tokens()->delete();
//         return response()->json(['message' => 'Logged out']);
//     }
    
// }

//AUthcontroller.php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,student', 
        ]);

        Log::info('Received role:', ['role' => $validated['role']]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request) {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        // Check for missing fields
        $missingFields = [];
        foreach (['school', 'age', 'gender', 'address'] as $field) {
            if (is_null($user->$field)) {
                $missingFields[] = $field;
            }
        }

        return response()->json([
            'token' => $token,
            'user' => $user->only(['id', 'name', 'email', 'role', 'school', 'age', 'gender', 'address']),
            'missingFields' => $missingFields, // Return missing fields
        ]);
    }

    public function updateProfile(Request $request) {
        $validated = $request->validate([
            'school' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'age' => 'nullable|integer|min:1|max:120',
            'gender' => 'nullable|in:male,female',
        ]);

        $user = $request->user(); // Get the logged-in user
        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }

    public function getUserDetails(Request $request)
    {
        // Return the authenticated user's details
        return response()->json($request->user(), 200);
    }


    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
