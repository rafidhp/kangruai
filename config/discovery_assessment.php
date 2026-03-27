<?php

return [
    'base_dna' => [
        'logic' => 30,
        'empathy' => 30,
        'creativity' => 30,
        'leadership' => 30,
        'technical' => 30,
        'communication' => 30,
    ],
    'questions' => [
        [
            'options' => [
                ['creativity' => 20, 'communication' => 5],
                ['technical' => 20, 'logic' => 10],
                ['leadership' => 20, 'communication' => 5],
                ['empathy' => 20, 'communication' => 5],
            ],
        ],
        [
            'options' => [
                ['creativity' => 20, 'empathy' => 5],
                ['logic' => 15, 'technical' => 10],
                ['communication' => 20, 'creativity' => 5],
                ['technical' => 15, 'creativity' => 10],
            ],
        ],
        [
            'options' => [
                ['creativity' => 15, 'leadership' => 10],
                ['logic' => 15, 'technical' => 10],
                ['empathy' => 15, 'creativity' => 10],
                ['technical' => 15, 'communication' => 10],
            ],
        ],
        [
            'options' => [
                ['empathy' => 20, 'leadership' => 5],
                ['communication' => 20, 'empathy' => 5],
                ['technical' => 15, 'empathy' => 10],
                ['leadership' => 20, 'empathy' => 5],
            ],
        ],
        [
            'options' => [
                ['leadership' => 20, 'communication' => 5],
                ['empathy' => 20, 'communication' => 5],
                ['technical' => 15, 'logic' => 10],
                ['creativity' => 15, 'logic' => 10],
            ],
        ],
        [
            'options' => [
                ['logic' => 15, 'technical' => 10],
                ['empathy' => 20, 'leadership' => 5],
                ['creativity' => 20, 'communication' => 5],
                ['leadership' => 15, 'communication' => 10],
            ],
        ],
        [
            'options' => [
                ['logic' => 20, 'technical' => 5],
                ['creativity' => 15, 'empathy' => 10],
                ['communication' => 15, 'empathy' => 10],
                ['logic' => 15, 'technical' => 10],
            ],
        ],
        [
            'options' => [
                ['creativity' => 10, 'communication' => 10],
                ['logic' => 15, 'leadership' => 5],
                ['technical' => 15, 'leadership' => 10],
                ['communication' => 15, 'empathy' => 10],
            ],
        ],
        [
            'options' => [
                ['creativity' => 15, 'empathy' => 5],
                ['logic' => 10, 'technical' => 10],
                ['empathy' => 15, 'communication' => 10],
                ['leadership' => 10, 'technical' => 5],
            ],
        ],
        [
            'options' => [
                ['creativity' => 25],
                ['logic' => 20, 'technical' => 5],
                ['empathy' => 25],
                ['leadership' => 20, 'communication' => 5],
            ],
        ],
    ],
];