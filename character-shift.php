<?php
/**
 * Plugin Name:       Character shift
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       character-shift
 *
 * @package           hjude
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function character_shift_character_shift_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'character_shift_character_shift_block_init' );


//render functions
function cleanString($inputString){
	$chunks = explode("br", $inputString);
	$output = [];

	foreach($chunks as $chunk){

		$line = [];

		$words = explode(" ", $chunk);

		foreach($words as $word){

			$trimmedWord = trim($word);

			if(!empty($trimmedWord)){
				$line[] = $trimmedWord; 
			}

		}

	}
}

function formatVariables($inputString, $variablesString){
	$variables = [];
	$pairs = explode(", ", $variablesString);

	foreach ($_GET as $key => $value) {
        $variables[$key] = $value;
    }

	foreach($pairs as $pair){
		$keyValue = explode('=', $pair);
		if(count($keyValue) === 2){

			$key = $keyValue[0];
			$value = $keyValue[1];
			$variables[$key] = $value;
		}
	}

	foreach ($_GET as $key => $value) {
        $variables[$key] = $value;
    }

	$formattedString = $inputString;

	foreach($variables as $key => $value){
		$placeholder = "{" . $key . "}";
		$formattedString = str_replace($placeholder, $value, $formattedString);
	}

	return $formattedString;

}