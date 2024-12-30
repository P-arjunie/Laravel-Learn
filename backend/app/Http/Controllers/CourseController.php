<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index() {
        return Course::all();
    }
    
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric',
            'duration' => 'nullable|integer',
            'instructor' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'image_url' => 'nullable|url' // URL validation for Firebase image
        ]);
        $course = Course::create($validated);
        return response()->json($course, 201);
    }
    
    public function show($id) {
        return Course::findOrFail($id);
    }
    
    public function update(Request $request, $id) {
        $course = Course::findOrFail($id);
        $course->update($request->only([
            'title' => 'sometimes|required',
            'description' => 'sometimes|required',
            'price' => 'nullable|numeric',
            'duration' => 'nullable|integer',
            'instructor' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'image_url' => 'nullable|url' // URL validation for Firebase image
        ]));
        return response()->json($course);
    }
    
    public function destroy($id) {
        Course::destroy($id);
        return response()->json(['message' => 'Course deleted']);
    }
    
}
