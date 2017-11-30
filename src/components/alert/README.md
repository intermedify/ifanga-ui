# Molecule: Alert

## Modifiers

`warning` and `error`

## Functionality

Add the `ifanga-component` attribute and the dismissable icon action like in the example below to create a dismissable
notification element.

## Example

```html
<div class="m-alert m-alert--error w-8" ifanga-component="Alert">
	<i class="m-alert__symbol a-icon a-icon__alert-octagon"></i>
	<div class="m-alert__content">
		<h6>There went something wrong :(</h6>
		<p>Add any error or issue content for the pop-up here.</p>
	</div>
	<i class="m-alert__action js-m-alert__action a-icon a-icon__x-circle"></i>
</div>
```
