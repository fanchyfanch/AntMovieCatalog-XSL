<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:config="some:config" exclude-result-prefixes="config">

	<xsl:output method="html" indent="yes" encoding="ISO-8859-1"/>
	<xsl:decimal-format name="fr" decimal-separator="," grouping-separator=" " />

	<xsl:param name="items" select="count(AntMovieCatalog/Catalog/Contents/Movie)" />
	<xsl:param name="limit">25</xsl:param>
	<xsl:param name="page">1</xsl:param>

	<xsl:variable name="criterium" select="document('')/xsl:stylesheet/config:criterium"/>
	<xsl:variable name="owner" select="document('')/xsl:stylesheet/config:owner"/>

	<config:criterium>
		<config:column name="TranslatedTitle" title="Titre traduit" data-type="text"/>
		<config:column name="OriginalTitle" title="Titre original" data-type="text"/>
		<config:column name="Category" title="Genre" data-type="text"/>
		<config:column name="Country" title="Pays" data-type="text"/>
		<config:column name="Director" title="Réalisateur" data-type="text"/>
		<config:column name="Producer" title="Producteur" data-type="text"/>
		<config:column name="Writer" title="Scénariste" data-type="text"/>
		<config:column name="Composer" title="Compositeur" data-type="text"/>
		<config:column name="Year" title="Année" data-type="number"/>
		<config:column name="Length" title="Durée" data-type="number"/>
		<config:column name="Size" title="Taille" data-type="number"/>
		<config:column name="UserRating" title="Note" data-type="number"/>
		<config:column name="AudioBitrate" title="Taux audio" data-type="number"/>
		<config:column name="AudioFormat" title="Format audio" data-type="number"/>
		<config:column name="VideoFormat" title="Format vidéo" data-type="number"/>
		<config:column name="VideoBitrate" title="Taux vidéo" data-type="number"/>
		<config:column name="Resolution" title="Résolution" data-type="number"/>
		<config:column name="Framerate" title="Fréquence" data-type="number"/>
	</config:criterium>

	<config:owner>
		<config:column name="Author" title="Author" data-type="text"/>
		<config:column name="Creator" title="Creator" data-type="text"/>
		<config:column name="Publisher" title="Publisher" data-type="text"/>
		<config:column name="Designer" title="Designer" data-type="text"/>
	</config:owner>

	<xsl:template match="AntMovieCatalog" >
		<xsl:variable name="Properties" select="./Catalog/Properties" />

		<!--[if lt IE 7 ]><html class="ie ie6 lt-ie10 lt-ie9 lt-ie8 lt-ie7 no-js" lang="fr" data-ng-app="myApp" xmlns:ng="http://angularjs.org"><![endif]-->
		<!--[if (IE 7)&!(IEMobile)]><html class="ie ie7 lt-ie10 lt-ie9 lt-ie8 no-js" lang="fr" data-ng-app="myApp" xmlns:ng="http://angularjs.org"><![endif]-->
		<!--[if (IE 8)&!(IEMobile)]><html class="ie ie8 lt-ie10 lt-ie9 no-js" lang="fr" data-ng-app="myApp" xmlns:ng="http://angularjs.org"><![endif]-->
		<!--[if IE 9 ]><html class="ie ie9 lt-ie10 no-js" lang="fr" data-ng-app="myApp" xmlns:ng="http://angularjs.org"><![endif]-->
		<!--[if gt IE 9]><!--><html class="no-js" lang="fr" data-ng-app="myApp" xmlns:ng="http://angularjs.org"><!--<![endif]-->
			<head>
		        <!--[if IE]>
		            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		            <meta http-equiv="imagetoolbar" content="no">
		        <![endif]-->

				<!--
				<meta http-equiv="content-language" content="fr" />
				-->

				<title>AntMovieCatalog</title>

				<meta name="Description" content="{$Properties/@Description}" />

				<xsl:for-each select="$owner/config:column">
					<meta name="{@name}" content="{$Properties/@Owner}" />
				</xsl:for-each>

				<!--
				<meta>
					<xsl:attribute name="name">Copyright</xsl:attribute>
					<xsl:attribute name="content">
						<xsl:text>© </xsl:text>
						<xsl:value-of select="$Properties/@Owner"/>
						<xsl:text> </xsl:text>
						<xsl:value-of select="$copyright"/>
					</xsl:attribute>
				</meta>

				<meta http-equiv="Refresh" content="0; url=AntMovieCatalog.xml" />

				<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular-route.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular-sanitize.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular-resource.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.4.5/angular-locale_fr-fr.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.4/ui-bootstrap-tpls.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-utils/0.1.1/angular-ui-utils.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-translate/2.7.2/angular-translate.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js"></script>

				<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-strap/2.3.1/angular-strap.min.js"></script>

				<script src="lib/bootstrap.css/js/bootstrap.js"></script>

				<script src="http://localhost/_libraries/JS/frameworks/angularjs/plugins/angular-strap/2.3.1/angular-strap.min.js"></script>


				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" media="all" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" media="all" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.7.1/css/flag-icon.min.css" />


				<link type="text/css" rel="stylesheet" href="http://localhost/_libraries/CSS/libraries/normalize/3.0.3/normalize.min.css" media="all" />
				<link type="text/css" rel="stylesheet" href="http://localhost/_libraries/CSS/fonts/font-awesome/4.4.0/css/font-awesome.min.css" media="all" />
				<link type="text/css" rel="stylesheet" href="http://localhost/_libraries/CSS/frameworks/bootstrap/3.3.5/css/bootstrap.min.css"/>
				-->
				<link rel="stylesheet" href="assets/css/main.css?ver={count(Contents/Movie)}" />
				<link rel="stylesheet" href="assets/css/print.css?ver={count(Contents/Movie)}" media="print" />
				<link rel="canonical" href="https://dl.dropboxusercontent.com/u/44037263/videos/AntMovieCatalog.xml" />

				<script src="bower_components/modernizr-min/modernizr.min.js"></script>
				<!--
				<script src="bower_components/jquery/dist/jquery.min.js"></script>
				-->
				<script src="bower_components/angular/angular.min.js"></script>
				<script src="bower_components/angular-route/angular-route.min.js"></script>
				<script src="bower_components/angular-resource/angular-resource.min.js"></script>
				<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
				<script src="bower_components/angular-translate/angular-translate.min.js"></script>
				<script src="bower_components/angular-i18n/angular-locale_fr-fr.js"></script>
				<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
				<script src="bower_components/angular-pageslide-directive/dist/angular-pageslide-directive.min.js"></script>
				<script src="bower_components/angular-dropdown-multiselect/dist/angular-dropdown-multiselect.min.js"></script>
				<script src="bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"></script>
				<script src="bower_components/angular-bootstrap-slider/slider.js"></script>
				<script src="bower_components/lodash/lodash.min.js"></script>
				<script src="bower_components/x2js/xml2json.min.js"></script>

				<script src="assets/js/app/app.js?ver={count(Contents/Movie)}"></script>
				<script src="assets/js/app/paginationModule/paging.js"></script>
				<script src="assets/js/app/moviesModule/controllers/app.js"></script>
				<script src="assets/js/app/moviesModule/controllers/controllers.js"></script>
				<script src="assets/js/app/moviesModule/services.js"></script>
				<script src="assets/js/app/moviesModule/filters.js"></script>
				<script src="assets/js/app/moviesModule/directives.js"></script>

				<script src="assets/js/helpers.js"></script>
			</head>

			<body ng-controller="moviesController" ng-init="sortDirection = false" ng-cloak="">
				<nav class="navbar navbar-fixed-top navbar-inverse" role="navigation">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">

						<button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="./AntMovieCatalog.xml#/home">
							Catalogue de <small class="angularJS">{{(filtered)}} / </small><xsl:value-of select="count(Catalog/Contents/Movie)"/> films<br/>
						</a>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="navbar-collapse angularJS" ng-class="{{'in': !navCollapsed}}">
						<form class="navbar-form navbar-right" role="search">
							<!--
							<div class="form-group">
								<div class="input-group">
									<input type="search" class="form-control" ng-model="search" placeholder="Rechercher"/>
								</div>
							</div>
							-->
							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="fa fa-search"></i>
									</span>
									<input type="search" class="form-control input-sm" ng-model="search" placeholder="Rechercher"/>
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<slider class="input-sm"
											ng-model="uniqueYears.model"
											min="uniqueYears.options.min"
											max="uniqueYears.options.max"
											range="true"
											tooltip_position="bottom"
											>
									</slider>
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<slider class="input-sm"
											ng-model="uniqueLength.model"
											min="uniqueLength.options.min"
											max="uniqueLength.options.max"
											range="true"
											tooltip_position="'bottom'"
											>
									</slider>
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<div ng-dropdown-multiselect="" options="uniqueCategory.options" selected-model="uniqueCategory.model" extra-settings="multiselect.settings" translation-texts="uniqueCategory.translateText"></div>
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<div ng-dropdown-multiselect="" options="uniqueCountry.options" selected-model="uniqueCountry.model" extra-settings="multiselect.settings" translation-texts="uniqueCountry.translateText"></div>
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<div ng-dropdown-multiselect="" options="sortCriteria.options" selected-model="sortCriteria.model" extra-settings="sortCriteria.settings" translation-texts="sortCriteria.translateText"></div>
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<button class="btn btn-primary" ng-click="sortDirection = !sortDirection"><i class="fa" ng-class="{{' fa-sort-alpha-asc' : sortDirection == false , ' fa-sort-alpha-desc' : sortDirection == true }}"></i></button>
								</div>
							</div>
							<div class="btn-group">
								<label class="btn btn-primary" ng-model="viewModel.model" btn-radio="'List'">
									<i class="fa fa-th-list"></i> List
								</label>
								<!--
								<label class="btn btn-primary" ng-model="viewModel.model" btn-radio="'Grid'">
									<i class="fa fa-th"></i> Grid
								</label>
								-->
								<label class="btn btn-primary" ng-model="viewModel.model" btn-radio="'Block'">
									<i class="fa fa-th-large"></i> Block
								</label>
							</div>
						</form>
						<ul class="nav navbar-nav navbar-right">
						<!--
							<li>
								<div style="background:white; "><pre>{{sortCriteria.model.id | json}}</pre></div>
								<div style="background:white; "><pre>{{uniqueCountry.model.id | json}}</pre></div>
								<div style="background:white; "><pre>{{uniqueCategory.model.id | json}}</pre></div>
							</li>
							<li class="active"><a href="#">Link</a></li>
							<li><a href="#">Link</a></li>

							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
								<ul class="dropdown-menu">
									<li><a href="#">Action</a></li>
									<li><a href="#">Another action</a></li>
									<li><a href="#">Something else here</a></li>
									<li><a href="#">Separated link</a></li>
									<li><a href="#">One more separated link</a></li>
								</ul>
							</li>
						-->
						</ul>
					</div><!-- /.navbar-collapse -->
				</nav>

				<main id="main" ng-class="viewModel.model">
					<section>
						<noscript>
							<xsl:apply-templates select="Catalog/Contents/Movie"></xsl:apply-templates>
						</noscript>
						<div ng-view=""></div>
					</section>
				</main>

				<footer id="site-footer" class="navbar navbar-inverse container-fluid">
					<nav class="angularJS" role="navigation">
						<div class="row">
							<form class="navbar-form form-inline" role="search">
								<div class="form-group col-xs-6 col-sm-1">
									<div class="btn-block dropup" ng-dropdown-multiselect="" options="perPage.options" selected-model="perPage.model" extra-settings="monoselect.settings" translation-texts="perPage.translateText"></div>
								</div>
								<div class="form-group col-xs-6 col-sm-2">
									<div class="input-group">
									  <span class="input-group-addon">
										  <i class="fa fa-arrow-right"></i>
									  </span>
										<input placeholder="page"
												class="form-control"
												maxlength="16"
												ng-model="currentPage"
												ng-init="currentPage = 1"/>
									</div>
								</div>
								<div class="form-group col-xs-12 col-sm-6 text-center">
									<paging
										class="small"
										page="currentPage"
										page-size="perPage.model.id"
										total="total = (filtered = (movies | filter:search | filter:uniqueCategorysearch | filter:uniqueCountrysearch | filter:uniqueYearsearch | filter:uniqueLengthsearch).length)"
										adjacent="1"
										scroll-top="scrollTop = true"
										hide-if-empty="hideIfEmpty = true"
										show-prev-next="showPrevNext = true"
										paging-action="DoCtrlPagingAct('Paging Clicked', page, perPage.model.id, total)">
									</paging>
								</div>
							</form>
							<div class="col-xs-12 col-sm-3 text-right">
								<a href="./#main">
									Back to top
								</a>
							</div>
						</div>
					</nav>
					<div id="siteinfo" class="row">
						<div class="col-xs-12 text-center">
							&#169;
							<a href="{$Properties/@Site}" target="_blank">
								<xsl:value-of select="$Properties/@Owner"/>
							</a>
							&#160;|

							<xsl:for-each select="Catalog/Contents/Movie">
								<xsl:sort select="number(substring(@Date, 0, 5))" order="ascending"/>
								<xsl:if test="position() = 1">
									<xsl:value-of select="substring(@Date, 0, 5)"/> -
								</xsl:if>
							</xsl:for-each>
							<xsl:value-of select="substring(@Date, 7, 4)"/>
						</div>
					</div>
				</footer>

				<div class="spinner" ng-show="isSomethingLoading"></div>
			</body>
		</html>
	</xsl:template>

	<!-- ONLY FOR NOSCRIPT VERSION -->
	<xsl:template match="Contents/Movie">

		<xsl:if test="position() &gt; ($limit * ($page - 1)) and position() &lt;= ($limit * $page)">
			<xsl:variable name="movie" select="."/>

			<article>
				<xsl:attribute name="class">
					<xsl:if test="(position() - ($limit * ($page - 1))) = 1">
						<xsl:text>first </xsl:text>
					</xsl:if>
					<xsl:if test="(position() - ($limit * ($page - 1))) = $limit or position()=last()">
						<xsl:text>last </xsl:text>
					</xsl:if>
					line_<xsl:value-of select="position() mod 2"/>
				</xsl:attribute>

				<header>
					<h1 class="TranslatedTitle">
						<xsl:value-of select="@TranslatedTitle" />
						<small class="OriginalTitle">
							<xsl:value-of select="@OriginalTitle" />
						</small>
					</h1>
					<xsl:if test="string(number(@Rating)) != 'NaN'">
						<div class="Rating">
							<xsl:call-template name="rating">
								<xsl:with-param name="i" select="1" />
								<xsl:with-param name="note" select="round(@Rating)" />
								<xsl:with-param name="length" select="10" />
							</xsl:call-template>
						</div>
					</xsl:if>
				</header>

				<div class="hentry-content">
					<div class="thumbnail__block">
						<img src="{translate(@Picture, '\\','/')}" />
					</div>
					<div class="movie-infos">
						<dl>
							<xsl:for-each select="$criterium/config:column">
								<xsl:variable name="config" select="."/>

								<xsl:if test="@name != 'OriginalTitle' and @name != 'TranslatedTitle' and @name != 'Rating'">
									<xsl:if test="$movie/@*[local-name() = $config/@name] != ''">
										<dt>
											<xsl:value-of select="@title"/>
										</dt>
										<dd>
											<xsl:attribute name="class"><xsl:value-of select="@name"/></xsl:attribute>

											<xsl:choose>
												<xsl:when test="@name = 'Length'">
													<xsl:call-template name="length">
														<xsl:with-param name="length" select="$movie/@Length"/>
													</xsl:call-template>
												</xsl:when>
												<xsl:when test="@name = 'Size'">
													<xsl:call-template name="size">
														<xsl:with-param name="size" select="$movie/@Size"/>
													</xsl:call-template>
												</xsl:when>
												<xsl:when test="@name = 'Framerate'">
													<xsl:call-template name="framerate">
														<xsl:with-param name="framerate" select="$movie/@Framerate"/>
													</xsl:call-template>
												</xsl:when>
												<xsl:otherwise>
													<span>
														<xsl:value-of select="$movie/@*[local-name() = $config/@name]"/>
													</span>
												</xsl:otherwise>
											</xsl:choose>
										</dd>
									</xsl:if>
								</xsl:if>
							</xsl:for-each>
						</dl>
					</div>

					<p class="Description">
						<xsl:value-of select="@Description" />
					</p>

					<p class="Actors">
						<span class="intitule">avec : </span>
						<span>
							<xsl:value-of select="@Actors"/>
						</span>
					</p>
				</div>

			</article>
		</xsl:if>
	</xsl:template>

	<!-- format Length to hour:min -->
	<xsl:template name="length">
		<xsl:param name="length"/>

		<span>
			<xsl:value-of select="concat(format-number(floor($length div 60), '00h'), format-number(floor($length mod 60), '00'))"/>
		</span>
	</xsl:template>

	<!-- format framerate -->
	<xsl:template name="framerate">
		<xsl:param name="framerate"/>

		<span>
			<xsl:value-of select="format-number($framerate,'# ###,00', 'fr')"/>
		</span>
	</xsl:template>

	<!-- format Size to Mo/Go -->
	<xsl:template name="size">
		<xsl:param name="size"/>
		
		<xsl:variable name="bytes" select="($size * 1000 * 1000)"/>
		
		<span>
			<xsl:choose>
				<xsl:when test="$bytes &gt;= 1000000000">
					<xsl:value-of select="format-number($bytes div 1000000000,'# ###,00', 'fr')"/> Go
				</xsl:when>
				<xsl:when test="$bytes &gt;= 1000000">
					<xsl:value-of select="format-number($bytes div 1000000,'# ###,##', 'fr')"/> Mo
				</xsl:when>
				<xsl:when test="$bytes &gt;= 1000">
					<xsl:value-of select="format-number($bytes div 1000,'# ###,##', 'fr')"/> Ko
				</xsl:when>
				<xsl:when test="$bytes &gt; 0 and $bytes &lt; 1000">
					<xsl:value-of select="format-number($bytes div 0,'# ###,##', 'fr')"/> Octets
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>0 Octets</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</span>
	</xsl:template>
	
	<!-- generate the RATING STARS presentation -->
	<xsl:template name="rating">
		<xsl:param name="i" />
		<xsl:param name="note" />
		<xsl:param name="length" />
		
		<div>
			<xsl:if test="$i &lt;= $note">
				<xsl:attribute name="class">rated</xsl:attribute>
			</xsl:if>
			&#9734; 
		</div>

		<xsl:if test="$i &lt; $length">
			<xsl:call-template name="rating">
				<xsl:with-param name="i" select="number($i) + 1" />
				<xsl:with-param name="note" select="$note" />
				<xsl:with-param name="length" select="$length" />
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<!-- show all nodes/attributes -->
	<xsl:template match="@*">
		<xsl:value-of select="name()"/>=<xsl:value-of select="."/><br/>
	</xsl:template>

</xsl:stylesheet>