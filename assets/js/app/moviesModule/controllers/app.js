"use strict";

var x2js = new X2JS();

var AntMovieCatalog = angular.module('AntMovieCatalog',[
    'ui.bootstrap',
    'ui.bootstrap-slider',
    'angular-dropdown-multiselect',
    'bw.paging',
    'pascalprecht.translate',
]);

AntMovieCatalog.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    _TranslatedTitle: 'Translated title',
    _OriginalTitle: 'Original title',
    _FormattedTitle: 'Formated title',
    _Category: 'Category',
    _Country: 'Country',
    _Director: 'Director',
    _Producer: 'Producer',
    _Writer: 'Writer',
    _Composer: 'Composer',
    _Actors: 'Actors',
    _Description: 'Synopsys',
    _Comments: 'Comments',
    _Year: 'Year',
    _Length: 'Length',
    _Size: 'Size',
    _Rating: 'Rating',
    _UserRating: 'User rating',
    _AudioBitrate: 'Audio bitrate',
    _AudioFormat: 'Audio format',
    _VideoFormat: 'Video format',
    _VideoBitrate: 'Video bitrate',
    _Resolution: 'Resolution',
    _Framerate: 'Framerate',
    _Number: 'Index',
    _Checked: 'Checked',
    _ColorTag: 'Color tag',
    _Source: 'Source',
    _Date: 'Import date',
    _DateWatched: 'View date',
    _Disks: 'Disks',
    _Picture: 'Poster',
    _URL: 'URL',
    with: 'with',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_FR: 'french'
  });
  $translateProvider.translations('fr', {
    _TranslatedTitle: 'Titre traduit',
    _OriginalTitle: 'Titre original',
    _FormattedTitle: 'Titre format�',
    _Category: 'Genre',
    _Country: 'Pays',
    _Director: 'R�alisateur',
    _Producer: 'Producteur',
    _Writer: 'Sc�nariste',
    _Composer: 'Compositeur',
    _Actors: 'Acteurs',
    _Description: 'Synopsys',
    _Comments: 'Commentaires',
    _Year: 'Ann�e',
    _Length: 'Dur�e',
    _Size: 'Taille',
    _Rating: 'Note',
    _UserRating: 'Ma note',
    _AudioBitrate: 'Taux audio',
    _AudioFormat: 'Format audio',
    _VideoFormat: 'Format vid�o',
    _VideoBitrate: 'Taux vid�o',
    _Resolution: 'R�solution',
    _Framerate: 'Fr�quence',
    _Number: 'Index',
    _Checked: 'Coch�',
    _ColorTag: 'Couleur de tag',
    _Source: 'Fichier',
    _Date: 'Date import',
    _DateWatched: 'Date vue',
    _Disks: 'Disques',
    _Picture: 'Affiche',
    _URL: 'URL',
    with: 'avec',
//    WELCOME_MESSAGE1: 'Mon nom est {{name}}',
//    WELCOME_MESSAGE2: 'Et mon nom est {{name}}. J\'ai {{age}} ans',
    BUTTON_LANG_EN: 'anglais',
    BUTTON_LANG_FR: 'fran�ais'
  });
  $translateProvider.preferredLanguage('fr');
  $translateProvider.useSanitizeValueStrategy(null);
});
