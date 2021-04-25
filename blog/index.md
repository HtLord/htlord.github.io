---
layout: main-frame
---

<div class="container">
    {% for categorySet in site.data.post-categories.images %}    
    <div class="container" style="margin-bottom: 16px;">
        <div class="row align-items-end">
            <h3 aria-current="page">{{ categorySet.category }}</h3>
        </div>
        <div class="row">
        {% for item in categorySet.items %}
        <div class="card text-center col-2 justify-content-between" style="margin-right: 8px">
            <a href="{{ item.url }}" style="padding: 16px;">
            <img class="card-img-top" src="{{ item.src }}"/>
            </a>
            <h5 class="card-title">{{ item.title }}</h5>
        </div>
        {% endfor %}
        </div>
    </div>
    {% endfor %}

    <div class="row justify-content-center">

        <div class="container">
            <div class="row justify-content-center">
                <h3>Credits</h3>
            </div>
            <div class="row justify-content-center">
                <h6 style="color: lightgrey;">order by my operation of icon addition or update</h6>
            </div>
            <div class="row justify-content-center">
                <ul>
                    <li><a href="https://iconscout.com/icons/apple" target="_blank">Apple Icon</a> by <a
                                href="https://iconscout.com/contributors/pocike" target="_blank">Alpár - Etele Méder</a>
                    </li>
                    <li><a href="https://iconscout.com/icons/linux" target="_blank">Linux Icon</a> by <a
                                href="https://iconscout.com/contributors/icon-54" target="_blank">Icon 54</a></li>
                    <li><a href="https://iconscout.com/icons/javascript" target="_blank">Javascript Icon</a> by <a
                                href="https://iconscout.com/contributors/icon-mafia" target="_blank">Icon Mafia</a></li>
                    <li><a href="https://iconscout.com/icons/python" target="_blank">Python Icon</a> by <a
                                href="https://iconscout.com/contributors/icon-54">Icon 54</a> on <a
                                href="https://iconscout.com">Iconscout</a></li>
                    <li><a href="https://iconscout.com/icons/git" target="_blank">Git Icon</a> by <a
                                href="https://iconscout.com/contributors/icon-mafia" target="_blank">Icon Mafia</a></li>
                    <li>
                        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a
                                    href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </li>
                    <li>Golang Icon made by <a href="https://www.google.com/">Google</a></li>
                    <li>Docker Icon made by <a href="https://www.docker.com/">Docker</a></li>
                    <li>Kubernetes Icon made by <a href="https://https://kubernetes.io/">Kubernetes</a></li>
                    <li>Window Icon made by <a href="https://www.google.com/">Google</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>


