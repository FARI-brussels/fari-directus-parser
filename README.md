# Parser for FARI

## How to use

everything should work out of the box, use like this:

```
import { fetchDirectus } from 'fari-directus-parser'

// provide either ID or slug

const item = fetchDirectus({id: number, slug: string })
```

## Custom parser

You can also create your own parser and pass as a second argument:


```
import { fetchDirectus } from 'fari-directus-parser'

const demoId = 1

function myParser(myArgs){
  // some parser function
}

const item = fetchDirectus({id}, myParser)
```

