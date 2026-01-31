// Sanity Schema Definitions
// These would be used in your Sanity Studio project

/*
 * Post Schema
 * 
 * export default {
 *   name: 'post',
 *   title: 'Post',
 *   type: 'document',
 *   fields: [
 *     {
 *       name: 'title',
 *       title: 'Title',
 *       type: 'string',
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'slug',
 *       title: 'Slug',
 *       type: 'slug',
 *       options: { source: 'title', maxLength: 96 },
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'excerpt',
 *       title: 'Excerpt',
 *       type: 'text',
 *       rows: 3
 *     },
 *     {
 *       name: 'publishedAt',
 *       title: 'Published At',
 *       type: 'datetime',
 *       initialValue: () => new Date().toISOString()
 *     },
 *     {
 *       name: 'mainImage',
 *       title: 'Main Image',
 *       type: 'image',
 *       options: { hotspot: true },
 *       fields: [
 *         {
 *           name: 'alt',
 *           title: 'Alternative Text',
 *           type: 'string'
 *         }
 *       ]
 *     },
 *     {
 *       name: 'body',
 *       title: 'Body',
 *       type: 'array',
 *       of: [
 *         { type: 'block' },
 *         { type: 'image', options: { hotspot: true } }
 *       ]
 *     },
 *     {
 *       name: 'category',
 *       title: 'Category',
 *       type: 'reference',
 *       to: [{ type: 'category' }]
 *     },
 *     {
 *       name: 'author',
 *       title: 'Author',
 *       type: 'reference',
 *       to: [{ type: 'author' }]
 *     },
 *     {
 *       name: 'readTime',
 *       title: 'Read Time (minutes)',
 *       type: 'number'
 *     },
 *     {
 *       name: 'downloadCount',
 *       title: 'Download Count',
 *       type: 'number',
 *       readOnly: true
 *     },
 *     {
 *       name: 'pdfFile',
 *       title: 'PDF File',
 *       type: 'file',
 *       options: { accept: '.pdf' }
 *     },
 *     {
 *       name: 'seo',
 *       title: 'SEO',
 *       type: 'object',
 *       fields: [
 *         { name: 'metaTitle', title: 'Meta Title', type: 'string' },
 *         { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
 *         { name: 'ogImage', title: 'Open Graph Image', type: 'image' }
 *       ]
 *     }
 *   ]
 * }
 */

/*
 * Category Schema
 * 
 * export default {
 *   name: 'category',
 *   title: 'Category',
 *   type: 'document',
 *   fields: [
 *     {
 *       name: 'title',
 *       title: 'Title',
 *       type: 'string',
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'slug',
 *       title: 'Slug',
 *       type: 'slug',
 *       options: { source: 'title', maxLength: 96 },
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'description',
 *       title: 'Description',
 *       type: 'text'
 *     }
 *   ]
 * }
 */

/*
 * Author Schema
 * 
 * export default {
 *   name: 'author',
 *   title: 'Author',
 *   type: 'document',
 *   fields: [
 *     {
 *       name: 'name',
 *       title: 'Name',
 *       type: 'string',
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'role',
 *       title: 'Role',
 *       type: 'string'
 *     },
 *     {
 *       name: 'image',
 *       title: 'Image',
 *       type: 'image',
 *       options: { hotspot: true }
 *     },
 *     {
 *       name: 'bio',
 *       title: 'Bio',
 *       type: 'text'
 *     }
 *   ]
 * }
 */

/*
 * Webinar Schema
 * 
 * export default {
 *   name: 'webinar',
 *   title: 'Webinar',
 *   type: 'document',
 *   fields: [
 *     {
 *       name: 'title',
 *       title: 'Title',
 *       type: 'string',
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'slug',
 *       title: 'Slug',
 *       type: 'slug',
 *       options: { source: 'title', maxLength: 96 },
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'excerpt',
 *       title: 'Excerpt',
 *       type: 'text',
 *       rows: 3
 *     },
 *     {
 *       name: 'date',
 *       title: 'Date',
 *       type: 'datetime',
 *       validation: Rule => Rule.required()
 *     },
 *     {
 *       name: 'duration',
 *       title: 'Duration',
 *       type: 'string'
 *     },
 *     {
 *       name: 'status',
 *       title: 'Status',
 *       type: 'string',
 *       options: {
 *         list: [
 *           { title: 'Upcoming', value: 'upcoming' },
 *           { title: 'Live', value: 'live' },
 *           { title: 'Replay Available', value: 'replay' }
 *         ]
 *       }
 *     },
 *     {
 *       name: 'presenter',
 *       title: 'Presenter',
 *       type: 'object',
 *       fields: [
 *         { name: 'name', title: 'Name', type: 'string' },
 *         { name: 'role', title: 'Role', type: 'string' }
 *       ]
 *     },
 *     {
 *       name: 'category',
 *       title: 'Category',
 *       type: 'reference',
 *       to: [{ type: 'category' }]
 *     },
 *     {
 *       name: 'videoUrl',
 *       title: 'Video URL',
 *       type: 'url'
 *     },
 *     {
 *       name: 'attendeeCount',
 *       title: 'Attendee Count',
 *       type: 'number'
 *     }
 *   ]
 * }
 */

export {}; // Make this a module
