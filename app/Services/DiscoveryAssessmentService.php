<?php

namespace App\Services;

class DiscoveryAssessmentService
{
    public function calculateDNA(array $answers): array
    {
        $config = config('discovery_assessment');

        $dna = $config['base_dna'];
        $questions = $config['questions'];

        foreach ($answers as $qIndex => $answerIndex) {
            if (!isset($questions[$qIndex]['options'][$answerIndex])) {
                continue;
            }

            $scores = $questions[$qIndex]['options'][$answerIndex];

            foreach ($scores as $key => $value) {
                $dna[$key] = min(100, ($dna[$key] ?? 0) + $value);
            }
        }

        return $dna;
    }
}