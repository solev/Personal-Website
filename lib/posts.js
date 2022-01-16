import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import markdown from 'remark-parse'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import carbon from './remark-carbon'
import axios from 'axios'

const postsDirectory = path.join(process.cwd(), 'posts')

// export function getSortedPostsData() {
//     // Get file names under /posts
//     const fileNames = fs.readdirSync(postsDirectory)
//     const allPostsData = fileNames.map(fileName => {
//         // Remove ".md" from file name to get id
//         const id = fileName.replace(/\.md$/, '')

//         // Read markdown file as string
//         const fullPath = path.join(postsDirectory, fileName)
//         const fileContents = fs.readFileSync(fullPath, 'utf8')

//         // Use gray-matter to parse the post metadata section
//         const matterResult = matter(fileContents)

//         // Combine the data with the id
//         return {
//             id,
//             ...matterResult.data
//         }
//     })
//     // Sort posts by date
//     return allPostsData.sort((a, b) => {
//         if (a.date < b.date) {
//             return 1
//         } else {
//             return -1
//         }
//     })
// }

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(markdown)
        .use(highlight)
        .use(html)
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    // Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}

export async function getContentfulPosts() {
    // const client = contentful.createClient({
    //     space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    // });
}

export async function getDevPosts() {
    const endpoint = 'https://dev.to/api/articles/me';
    const apiKey = process.env.DEV_API_KEY;

    try {

        let response = await axios.get(endpoint, {
            headers: {
                'api-key': apiKey
            }
        });  
        
        return response.data;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export async function getDevPost(slug){
    const username = process.env.DEV_USERNAME;
    const endpoint = `https://dev.to/api/articles/${username}/${slug}`;

    let response = await axios.get(endpoint);

    let post = response.data;

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(markdown)
        .use(carbon)
        .use(html)
        .process(post.body_markdown)

    const contentHtml = processedContent.toString()

    return {
        contentHtml,
        ...post
    };
}