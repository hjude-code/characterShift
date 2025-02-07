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

function shiftWord(){
	foreach($words as $wordIndex=>$word){
		$chars = str_split($word);
		echo '<span class="wordBox">';
		foreach($chars as $charIndex=>$char){
			echo '<span class="charBox" style="transition-duration:'.($offestWord+$offsetChar)/8 .'s;">';
			echo '<span>'.$char.'</span>';
			echo '<span>'.$char.'</span>';
			echo '<span>'.$char.'</span>';
			echo '</span>';

			$offsetChar+=$offsetStep;
		}
		echo '</span>';

		$offestWord+=$offsetStep;
	}
}

function character_shift_character_shift_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'character_shift_character_shift_block_init' );
