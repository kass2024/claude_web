<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactMessageController extends Controller
{
    public function store(StoreContactMessageRequest $request): JsonResponse
    {
        $message = ContactMessage::query()->create($request->validated());

        return response()->json([
            'ok' => true,
            'id' => $message->id,
        ], 201);
    }
}

