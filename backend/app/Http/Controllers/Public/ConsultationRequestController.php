<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConsultationRequest;
use App\Models\ConsultationRequest;
use Illuminate\Http\JsonResponse;

class ConsultationRequestController extends Controller
{
    public function store(StoreConsultationRequest $request): JsonResponse
    {
        $consultation = ConsultationRequest::query()->create($request->validated());

        return response()->json([
            'ok' => true,
            'id' => $consultation->id,
        ], 201);
    }
}

