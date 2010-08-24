{% paginate search.results by 12 %}<h1>Search</h1>
<!-- START FINDER -->
<div id="finder" class="clear">
	<form method="get" action="/search">
		<input type="text" name="q"{% if search.performed %} value="{{ search.terms | escape | downcase }}"{% endif %} class="field" /> 
		<input type="submit" value="Search" class="submit" />
	</form>
</div>
<!-- END FINDER -->{% if search.results == empty %}
<p id="empty">Your search for "{{ search.terms | escape | downcase }}" did not yield any results.</p>{% else %}
<!-- START RESULTS -->
<ul id="results" class="clear">{% for item in search.results %}
	<!-- START RESULT {{ forloop.index }} -->
	<li{% cycle '', '', ' class="end"' %}>{% if item.featured_image %}
		<!-- START IMAGE -->
		<div class="image">
			<div class="align">
				<div><a href="{{ item.url | within: collections.all }}"><img src="{{ item.featured_image | product_img_url: "medium" }}" alt="{{ item.title | escape }}" /></a></div>
			</div>
		</div>
		<!-- END IMAGE -->
		<h3><a href="{{ item.url | within: collections.all }}">{{ item.title | escape | truncate: 25 }}</a></h3>
		<p>{{ item.price | money }}{% if item.compare_at_price_max > item.price %} <del>{{ item.compare_at_price_max | money }}</del>{% endif %}</p>{% else %}
		<!-- START DESC -->
		<div class="desc">
			<div class="bg">
				<p>{{ item.content | strip_html | strip_newlines | truncate: 320 | highlight: search.terms }}</p>
			</div>
		</div>
		<!-- END DESC -->
		<h3><a href="{{ item.url }}">{{ item.title | escape | truncate: 25 }}</a></h3>
		<p><a href="{{ item.url }}">Read More</a></p>{% endif %}
	</li>
	<!-- END RESULT {{ forloop.index }} -->{% endfor %}
</ul>
<!-- END RESULTS -->{% if paginate.pages > 1 %}
<!-- START PAGINATE -->
<div id="paginate">
	{{ paginate | default_pagination }}
</div>
<!-- END PAGINATE -->{% endif %}{% endif %}{% endpaginate %}