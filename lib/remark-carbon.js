import visit from "unist-util-visit";

function getCarbonIframe(src) {

    let result = {
        src: `https://carbon.now.sh/embed?bg=rgba%28171%2C184%2C195%2C0%29&t=verminal&wt=none&l=application%2Fx-sh&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=false&pv=56px&ph=5px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=%25E2%259D%25AF%2520kubectl%2520get%2520pods%250ANo%2520resources%2520found.`,
        style: 'width: 680px; height: 222px; border:0; transform: scale(1); overflow:hidden;',
        sandbox: 'allow-scripts allow-same-origin'
    }

    return result;
}

function carbon({include, exclude, prefix} = {}) {
    return (ast) => visit(ast, 'code', visitor)

    function visitor(node, index, parent) {
        console.log(parent);
        let { lang, data } = node

        if (
            !lang ||
            (include && !include.includes(lang)) ||
            (exclude && exclude.includes(lang))
        ) {
            return
        }

        if (!data) {
            data = {}
            node.data = data
        }

        if (!data.hProperties) {
            data.hProperties = {}
        }        

        // data.hChildren = low.highlight(lang, node.value, { prefix }).value
        data.hProperties.className = [
            'hljs',
            ...(data.hProperties.className || []),
            'language-' + lang
        ]
    }
}

export default carbon;