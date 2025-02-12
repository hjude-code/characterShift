/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, SelectControl, TextControl, TextareaControl} from '@wordpress/components'
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {

	const {
		attributes:{textCopy, MessageType, MetaKey, shiftBy, inlineVariables},
		setAttributes,
		context:{postType, postId, queryId}
	} = props
	
	const post = useSelect((select) => {
		return select('core').getEntityRecord('postType', 'post', postId);
	}, [postId]);
	


	const onChangeTextCopy = (newTextCopy) =>{
		setAttributes( {textCopy: newTextCopy} );
	};
	const onChangeMessageType = (newMessageType) =>{
		setAttributes( {MessageType: newMessageType} );

	};
	
	const onChangeMetaKey = (newMetaKey) =>{
		setAttributes( {MetaKey: newMetaKey} );
	};


		

	return (
		<p { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<PanelRow>
							<TextControl
							label="Meta Field"
							value={MetaKey}
							onChange={onChangeMetaKey}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
							label="Meta Type"
							value={MessageType}
							options={ [
								{ label: 'Static Message', value: 'Static' },
								{ label: 'Post Meta', value: 'Meta' },
								{ label: 'Dynamic Link Message', value: 'Dynamic' },
								{ label: 'Title', value: 'Title' }
							] }
							onChange={( newMessageType ) => onChangeMessageType( newMessageType )}
							/>
						</PanelRow>
						<PanelRow>
							<TextareaControl
								label="inline variables"
								value={inlineVariables}
								onChange={( newInlineVariables ) => setAttributes({inlineVariables: newInlineVariables})}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody>
						<PanelRow>
							<SelectControl
								label="Shift By"
								value = {shiftBy}
								options={[
									{label: 'Word', value: "Word"},
									{label: 'Character', value: 'Character'}
								]
								}
								onChange={(newShiftBy) => setAttributes({shiftBy: newShiftBy})}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<RichText
				tagName='h1'
				value={textCopy}
				onChange={onChangeTextCopy}
			/>
		</p>
	);
}
