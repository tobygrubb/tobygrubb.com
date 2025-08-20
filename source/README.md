
# this.design-react

This is the repo for this.design. It is built on React using `prismic.io` as its’ CMS.

## Layout


![](https://user-images.githubusercontent.com/31973492/47823027-9c428880-dd23-11e8-8912-c70beaab9604.gif)


The site is built with three containers. `root`, `about`, and `work`. The main container is `root`, which contains the homepage video as well as the case studies. When the `view` changes, it’s reflected in the DOM by adding a classname to the `.views` wrapper. Those classes are as follows:

| .-view-is-root                                                                                            | .-view-is-about                                                                                           | .-view-is-work                                                                                            |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![](https://user-images.githubusercontent.com/31973492/47806187-5b804a80-dcf6-11e8-8bc2-82a96883e7cf.png) | ![](https://user-images.githubusercontent.com/31973492/47806185-5b804a80-dcf6-11e8-95d3-e22d233c3dc0.png) | ![](https://user-images.githubusercontent.com/31973492/47806191-5c18e100-dcf6-11e8-9a25-03ce092ff669.png) |
| The default view. This is where the homepage and case studies are viewed from.                            | The about view as the name states, is where the about section is held.                                    | The work view is where all of the links to case studies are held                                          |


## Routing

The site uses React Router v4. Because of the heavy reliance on animation, RR is used imperatively. RR captures the url and changes the `view` and `currentCaseStudy` based on it.

When the user clicks on a case study from the `work` view, it changes the `view` state and modifies the url accordingly


## Prismic

[Start here](https://prismic.io/docs/reactjs/getting-started/getting-started-from-scratch) for the full API reference

#### `prismicCtx`
This is an object that contains a bunch of Prismic-related items. fetching data from Prismic is done through the `prismicCtx` prop.

#### Fetching Data
Use `props.prismicCtx.api` to use `getByUID`, `getSingle`, `query` ,etc. Full reference here.
