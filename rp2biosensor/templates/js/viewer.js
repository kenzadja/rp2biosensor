/*jshint esversion: 6 */
/*
__author__ = 'Thomas Duigou'
__license__ = 'MIT'
*/

// Utils ///////////////////////////

/**
 * Put chemical info into the information panel
 */
function panel_chemical_info(node, show=false){
    if (show){
        // Collect
        let node_id = node.data('id');
        let label = node.data('label');
        let svg = node.data('svg');
        let smiles = node.data('smiles');
        let inchi = node.data('inchi');
        let inchikey = node.data('inchikey');
        if (node.data('cofactor') == 1){
            var cofactor = 'Yes';
        } else {
            var cofactor = 'No';
        }
        if (node.data('sink_chemical')){
            var insink = 'Yes';
        } else {
            var insink = 'No';
        }
        // Inject
        $("span.chem_info_label").html(label);
        if (inchikey == "" || inchikey == null){
            $("span.chem_info_inchikey").html("NA");
            $("span.chem_info_inchikey_search").html("");
        } else {
            $("span.chem_info_inchikey").html(inchikey);
            $("span.chem_info_inchikey_search").html('<a target="_blank" href="http://www.google.com/search?q=' + encodeURI(inchikey) + '">Look for identical structure using Google</a>');
        }
        if (inchi == ""|| inchi == null){
            $("span.chem_info_inchi").html("NA");
            $("span.chem_info_inchi_search").html("");
        } else {
            $("span.chem_info_inchi").html(inchi);
            $("span.chem_info_inchi_search").html('<a target="_blank" href="https://pubchem.ncbi.nlm.nih.gov/search/#collection=compounds&query_type=structure&query_subtype=identity&query=' + encodeURI(inchi) + '">Look for identical structure using PubChem</a>');
        }
        if (smiles == ""|| smiles == null){
            $("span.chem_info_smiles").html("NA");
            $("span.chem_info_smiles_search").html("");
        } else {
            $("span.chem_info_smiles").html(smiles);
            $("span.chem_info_smiles_search").html('<a target="_blank" href="https://pubchem.ncbi.nlm.nih.gov/search/#collection=compounds&query_type=structure&query_subtype=identity&query=' + encodeURI(smiles) + '">Look for identical structure using PubChem</a>');
        }
        $("span.chem_info_iscofactor").html(cofactor);
        $("span.chem_info_isprecursor").html(insink);
        
        // Inject SVG depiction as a background image (if any)
        if (svg !== null && svg !== ""){
            $('div.img-box').show();
            $('div.chem_info_svg').css('background-image', "url('" + svg + "')");
        } else {
            $('div.img-box').hide();
        }
        // Show
        $("#panel_chemical_info").show();
    } else {
        $("#panel_chemical_info").hide();
    }
}

/**
 * Append crosslink for EC numbers
 * @param {string} ec_number
 */
function append_ec_number_crosslink(ec_number){
    let url = '<a href="https://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=' 
            + ec_number + '">' + ec_number + '</a>';
    return url;
}

function append_template_reaction_crosslink(template_id){
    let url = '<a href="https://www.metanetx.org/equa_info/'
            + template_id + '">' + template_id + '</a>';
    return url;
}

/**
 * Put intro info into the information panel
 * @param {boolean} show True to show the startup legend
 */
function panel_startup_legend(show=true){
    if (show){
        $("#panel_startup_legend").show();
    } else {
        $("#panel_startup_legend").hide();
    }
}

/**
 * Put reaction info into the information panel
 */
function panel_reaction_info(node, show=true){
    if (show){
        // Collect
        let node_id = node.data('id');
        let label = node.data('label')
        let rsmiles = node.data('rsmiles');
        let rule_ids = node.data('rule_ids');
        let rxn_template_ids = node.data('rxn_template_ids');
        let ec_numbers = node.data('ec_numbers');
        let thermo_value = node.data('thermo_dg_m_gibbs');
        let rule_score = node.data('rule_score');
        let uniprot_ids = node.data('uniprot_ids');
        // Inject 
        $("span.reaction_info_rsmiles").html(rsmiles);
        // Reaction name
        $("span.reaction_info_name").html(label);
        // Rule IDs
        $("div.reaction_info_ruleids").html('');  // Reset div content
        for (let i = 0; i < rule_ids.length; i++){
            $("div.reaction_info_ruleids").append(rule_ids[i] + '<br/>');
        }
        // Reaction template IDs
        $("div.reaction_info_reaction_template_ids").html('');  // Reset div content
        console.log(rxn_template_ids);
        for (let i = 0; i < rxn_template_ids.length; i++){
            let url = append_template_reaction_crosslink(rxn_template_ids[i]);
            console.log(url);
            $("div.reaction_info_reaction_template_ids").append(url + '<br/>');
        }
        // EC numbers
        $("div.reaction_info_ecnumbers").html('');  // Reset div content
        if (ec_numbers == null || ec_numbers.length == 0){
            $("div.reaction_info_ecnumbers").append('None<br/>');
        } else {
            for (let i = 0; i < ec_numbers.length; i++){
                let url = append_ec_number_crosslink(ec_numbers[i]);
                $("div.reaction_info_ecnumbers").append(url + '<br/>');
            }
        }


        https://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=1.3.99.31

        // // Inject crosslinks
        // $("div.reaction_info_xlinks").html('');  // Reset div content
        // if (xlinks != null && xlinks.length > 0){
        //     for (let i = 0; i < xlinks.length; i++){
        //         $("div.reaction_info_xlinks").append('<a target="_blank" href="' + xlinks[i]['url'] + '">' + xlinks[i]['db_name'] + ':' + xlinks[i]['entity_id'] + '</a>');
        //         $("div.reaction_info_xlinks").append('<br/>');
        //     }
        // } else {
        //     $("div.reaction_info_xlinks").append('None<br/>');
        // }
        // Thermodynamic value
        if (isNaN(thermo_value)){
            thermo_value = "NaN";
        } else {
            thermo_value = parseFloat(thermo_value).toFixed(3);
        }
        $("span.reaction_info_thermo").html(thermo_value);
        // Rule score
        if (isNaN(rule_score)){
            rule_score = "NaN";
        } else {
            rule_score = parseFloat(rule_score).toFixed(3);
        }
        $("span.reaction_info_rule_score").html(rule_score);
        // Inject UniProt IDs
        $("div.reaction_info_uniprot_crosslinks").html('');  // Reset div content
        let nb_ids = 0;
        for (let uid in uniprot_ids) {
            ++nb_ids;
            let selenzy_score = parseFloat(uniprot_ids[uid]['score']).toFixed(1)
            $("div.reaction_info_uniprot_crosslinks").append(
                    '<a href="' + get_uniprot_xlink(uid) + '">' + uid + '</a> (' + selenzy_score + ')'
                );
            $("div.reaction_info_uniprot_crosslinks").append(
                '<br/>'
                );
        }
        if (nb_ids == 0){
            $("div.reaction_info_uniprot_crosslinks").append('None<br/>');
        }
        // Selenzyme crosslink
        $("span.reaction_info_selenzyme_crosslink").html('<a target="_blank" href="http://selenzyme.synbiochem.co.uk/results?smarts=' + encodeURIComponent( rsmiles ) + '">Crosslink to Selenzyme</a>');
        // Show
        $("#panel_reaction_info").show();
    } else {
        $("#panel_reaction_info").hide();
    }
}


/**
 * Generate links to UniProt web site
 * @param {uid} UniProt ID to be used 
 */
function get_uniprot_xlink(uid){
    return 'https://www.uniprot.org/uniprot/' + uid
}


/**
 * Make labels for chemicals
 *
 * @param {Integer} max_length: string size cutoff before label truncation
 */
function make_chemical_labels(max_length=6){
    let nodes = cy.nodes().filter('[type = "chemical"]');
    for (let i = 0; i < nodes.size(); i++){
        let node = nodes[i];
        let label = node.data('label');
        if ((typeof label != 'undefined') && (label != 'None') && (label != '')){
            if (label.length > max_length){
                short_label = label.substr(0, max_length-2)+'..';
            } else {
                short_label = label;
            }
        } else {
            short_label = '';
        }
        node.data('short_label', short_label);
    }
}

/**
 * Make labels for reactions
 *
 * @param {Integer} max_length: string size cutoff before label truncation
 */
function make_reaction_labels(max_length=10){
    let nodes = cy.nodes().filter('[type = "reaction"]');
    for (let i = 0; i < nodes.size(); i++){
        let node = nodes[i];
        let label = node.data('label');
        if ((typeof label != 'undefined') && (label != 'None') && (label != '')){
            if (label.length > max_length){
                short_label = label.substr(0, max_length-2)+'..';
            } else {
                short_label = label;
            }
        } else {
            short_label = '';
        }
        node.data('short_label', short_label);
    }
}

// Live ///////////////////////////


$(function(){

    // Cytoscape object to play with all along
    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        motionBlur: true
    });

    // Basic stuff to do only once
    panel_startup_legend(true)
    panel_chemical_info(null, false);
    panel_reaction_info(null, false);
    init_network(true);
    refresh_layout();
    show_cofactors(false);

    /**
     * Initialise the network, but hide everything
     *
     * @param show_graph (bool): show the loaded network
     */
    function init_network(show_graph=true){
        // Reset the graph
        cy.json({elements: {}});
        cy.minZoom(1e-50);
        
        // Load the full network
        cy.json({elements: network['elements']});
        
        // Create node labels
        make_chemical_labels(20);
        make_reaction_labels(9);
        
        // Hide them 'by default'
        if (! show_graph){
            show_pathways(selected_paths='__NONE__');
        } else {
            $('input[name=path_checkbox]').prop('checked', true);  // Check all
        }
        
        // Once the layout is done:
        // * set the min zoom level
        // * put default info
        cy.on('layoutstop', function(e){
            cy.minZoom(cy.zoom());
        });
        
        cy.style(
            cytoscape.stylesheet()
                .selector("node[type='reaction']")
                    .css({
                        'height': 60,
                        'width': 120,
                        'background-color': 'white',
                        'border-width': 5,
                        'border-color': 'darkgray',
                        'border-style': 'solid',
                        'content': 'data(short_label)',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'text-opacity': 1,
                        'color': '#575757',
                        'font-size': '20px',
                    })
                .selector("node[type='chemical']")
                    .css({
                        'background-color': '#52be80',
                        'background-fit':'contain',
                        'shape': 'roundrectangle',
                        'width': 80,
                        'height': 80,
                        'label': 'data(short_label)',
                        'font-size': '20px',
                        // 'font-weight': 'bold',
                        'text-valign': 'top',
                        'text-halign': 'center',
                        'text-margin-y': 8,
                        'text-opacity': 1,
                        'text-background-color': 'White',
                        'text-background-opacity': 0.85,
                        'text-background-shape': 'roundrectangle',
                    })
                .selector("node[type='chemical'][?target_chemical]")
                    .css({
                        'background-color': '#B22222',
                        'border-color': '#B22222',
                    })
                .selector("node[type='chemical'][?sink_chemical]")
                    .css({
                        'background-color': '#68956D',
                        'border-color': '#68956D'
                    })
                .selector("node[type='chemical'][!target_chemical][!sink_chemical]")  // ie: intermediates
                    .css({
                        'background-color': '#235789',
                        'border-color': '#235789',
                    })
                .selector("node[type='chemical'][?svg]")  // The beauty of it: "?" will match only non null values
                    .css({
                        'background-image': 'data(svg)',
                        'background-fit': 'contain',
                        'border-width': 8,
                    })
                .selector('edge')
                    .css({
                        'curve-style': 'bezier',
                        'line-color': 'darkgray',
                        'width': '5px',
                        'target-arrow-shape': 'triangle',
                        'target-arrow-color': 'darkgray',
                        'arrow-scale' : 2
                    })                    
                .selector('.faded')
                    .css({
                        'opacity': 0.15,
                        'text-opacity': 0.25
                    })
                .selector('.highlighted')
                    .css({
                        'width': '9px'
                    })
                .selector('node:selected')
                    .css({
                        'border-width': 5,
                        'border-color': 'black'
                    })
        );
        
        cy.on('tap', 'node', function(evt){
            let node = evt.target;
            // Print info
            if (node.is('[type = "chemical"]')){
                panel_reaction_info(null, false);
                panel_chemical_info(node, true);
            } else if (node.is('[type = "reaction"]')){
                panel_chemical_info(null, false);
                panel_reaction_info(node, true);
            }
        });

        cy.on('tap', 'edge', function(evt){
            let edge = evt.target;
        });
        
    }
    
    /**
     * Trigger a layout rendering
     * 
     * @param {cytoscape collection} element_collection: a collection of elements.
     */
    function render_layout(element_collection){
        // Playing with zoom to get the best fit
        cy.minZoom(1e-50);
        cy.on('layoutstop', function(e){
            cy.minZoom(cy.zoom()*0.9);  // 0.9 to enable the user dezoom a little
        });
        // Layout breadthfirst
        let layout = element_collection.layout({
            name: 'breadthfirst',
            circle: false,
            roots: cy.elements("node[?target_chemical]"),
            transform: function (node, position ){  // Target at the bottom
                return {
                    x: -1 * position.x,
                    y: -1 * position.y
                };
            }
        })
        // Layout concentric
        // let layout = element_collection.layout({
        //     name: 'concentric',
        //     directed: true,
        //     circle: true,
        //     padding: 30,
        //     minNodeSpacing: 20,
        //     concentric: function(node){return node.data('concentric') * -1;},
        //     levelWidth: function(){return 1;},
        //     animate: false,
        //     roots: cy.elements("node[?target_chemical]")
        // });
        // Layout cose
        // let layout = element_collection.layout({
        //     name: 'cose',
        //     directed: true,
        //     animate: false,
        //     padding: 30,
        //     componentSpacing: 40,
        //     roots: cy.elements("node[?target_chemical]")
        // });
        // Layout cola
        // let layout = element_collection.layout({
        //     name: 'cose-bilkent',
        //     quality: 'proof',
        //     padding: 10,
        //     nodeRepulsion: 9000,
        //     idealEdgeLength: 100,
        // })
        layout.run();
    }
        

    /** Handle cofactor display
     *
     * Hide of show all nodes annotated as cofactor
     *
     * @param show (bool): will show cofactors if true
     */
    function show_cofactors(show=true){
        if (show){
            cy.elements().style("display", "element");
        } else {
            cy.elements('node[?cofactor][?hiddable_cofactor]').style("display", "none");
            cy.elements('node[?cofactor]').style("display", "none");
        }
        refresh_layout();
    }

    
    /**
     * Refresh layout according to visible nodes
     */
    function refresh_layout(){
        render_layout(cy.elements().not(':hidden'));
    }

        
    // Cofactors handling
    $('#show_cofactors_button').on('click', function(event){
        show_cofactors(true);
    });
    $('#remove_cofactors_button').on('click', function(event){
        show_cofactors(false);
    });
    
});
