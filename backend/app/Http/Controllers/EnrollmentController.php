<?php

namespace App\Http\Controllers;

use App\Models\MyLearning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    // Enroll a student in a course
    public function enroll(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $studentId = Auth::id(); // Assuming the student is authenticated

        // Check if already enrolled
        if (MyLearning::where('student_id', $studentId)->where('course_id', $request->course_id)->exists()) {
            return response()->json(['message' => 'You are already enrolled in this course.'], 400);
        }

        // Create enrollment
        MyLearning::create([
            'student_id' => $studentId,
            'course_id' => $request->course_id,
        ]);

        return response()->json(['message' => 'Enrolled successfully!'], 201);
    }

    // Get all courses the student is enrolled in
    public function myLearning()
    {
        $studentId = Auth::id(); // Assuming the student is authenticated

        $enrolledCourses = MyLearning::with('course')->where('student_id', $studentId)->get();

        return response()->json($enrolledCourses);
    }
}
