<?php

$testimonials = [
		[
				'src' => 'contributer0.jpg',
				'name' => 'Ivan Stefanov',
				'title' => 'Movie fan',
				'testimony' => 'Just imagine a ton of testimonials and recomendations writen in here.',
		],
		[
				'src' => 'contributer1.jpg',
				'name' => 'Vasil Atanasov',
				'title' => 'HUGO BOSS',
				'testimony' => 'The author sincerely hopes to receive a possitive review from the HUGO BOSS in the near future',
		]
];


echo json_encode($testimonials);