# Crises of democracy are hard to overcome in the short term

This repository contains the methodology, source code and data sources that support [this story](https://dw.com/data) about democratic backsliding in the 21st century.

Idea, research, analysis, visualization: [Rodrigo Menegat Schuinski](https://twitter.com/RodrigoMenegat).

## Data sources

Two main data sources were used for this project, both of them published by the [V-Dem Institute](https://www.v-dem.net/):

- The [V-Dem Dataset Version 12](https://www.v-dem.net/vdemds.html) was used to report on both the categorical and continuous ranking of countries by their democratic status, using the Regimes of the World classification scheme and the Liberal Democracy Index formula, respectively.

- The [Episodes of Regime Transformation Dataset](https://www.v-dem.net/ertds.html) was used to identify which countries went through significant periods of autocratization and the outcomes in the aftermath of the episode.

The files are not included in this repository because they are too big. Instead they can be accessed via the websites linked above.

## Research papers

Apart from the raw data sources, the story also draws on concepts borrowed from research articles:

- **A Framework for Understanding Regime Transformation: Introducing the ERT Dataset**, by Seraphine F. Maerz, Amanda Edgell, Matthew C. Wilson, Sebastian Hellmeier and Staffan I. Lindberg. Available [here](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3781485).

- **Democratic Legacies: Using Democratic Stock to Assess Norms, Growth, and Regime Trajectories**, by Amanda B. Edgell, Matthew C. Wilson, Vanessa A. Boese, Sandra Grahn. Available [here](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3595957).


- **How democracies prevail: democratic resilience as a two-stage process**, by 
Vanessa A. Boese, Amanda B. Edgell, Sebastian Hellmeier, Seraphine F. Maerz and Staffan I. Lindberg. Available [here](https://www.tandfonline.com/doi/full/10.1080/13510347.2021.1891413).

- **Democratic Legacies: Using Democratic Stock to Assess Norms, Growth, and Regime Trajectories**, by [here](http://dx.doi.org/10.2139/ssrn.3595957).

- **Regimes of the World (RoW): Opening New Avenues for the Comparative Study of Political Regimes**, by Anna Lührmann, Marcus Tannenberg and Staffan I. Lindberg. Available [here](https://doi.org/10.17645/pag.v6i1.1214).

- **What halts democratic erosion? The changing role of accountability**, by Melis G. Laebens and Anna Lührmann (2021). Available [here](https://doi.org/10.1080/13510347.2021.1897109).


## Line-by-line reproducibility

You can find supporting data for the claims of the story in the `data-analysis` repository.

## Data visualization

You can find the source code and processed data for the charts in the `dataviz` repository. 

The source data was processed into CSV files created by the `dataviz.ipynb` script, except for one, which was created manually as a JSON file (```chart-05.json```).

Those were then used to make charts using D3.js, as seen in the scripts named `chart-0n.js`. 
