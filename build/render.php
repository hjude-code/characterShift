<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$MessageType = $attributes['MessageType'];
$message = $attributes['textCopy'];

if($MessageType == 'Meta'){
	global $post;
	if($post){
		$MetaKey = $attributes['MetaKey'];
		if($MetaKey !== ''){
			$MetaValue = $post->$MetaKey;
			if($MetaValue !== ''){
				$message = $MetaValue;
			}
		}
	}
}
if($MessageType == 'Dynamic'){
	$message = 'dynamic';
}

//  if(isset($_GET['message'])){
// 	$message = $_GET['message'];
//  }else if($attributes['MetaKey'] !== ''){
// 	$post_id = get_the_ID();
// 	$message = get_post_meta($post_id, $attributes['MetaKey'], true);
//  }else{
// 	$message = $attributes['textCopy'];
//  }

$words = explode(' ', $message);
$offestWord = 0;
$offsetChar = 0;
$offsetStep = $attributes['offsetStep'];



?>
<h1 <?php echo get_block_wrapper_attributes(); ?>>
	<?php
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
	?>
</h1>
