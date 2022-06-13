// This interface contains all the data we care about from the UWFlow API
// when we fetch a course

interface UWFlowPostrequisite {
    postrequisite: {
        code: string,
    }
}

export default interface IUWFlowCourse {
    antireqs?: string,
    prereqs?: string,
    coreqs?: string,
    postrequisites?: UWFlowPostrequisite[],
    rating: {
        liked: number,
        easy: number,
        useful: number,
        filled_count: number,
        comment_count: number,
    }
}