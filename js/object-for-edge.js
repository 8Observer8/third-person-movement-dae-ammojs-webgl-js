class ObjectForEdge
{
    constructor(program, amountOfVertices, vertPosBuffer)
    {
        this.position = [0, 0, 0];
        this.rotation = glMatrix.quat.create();
        this.scale = [1, 1, 1];

        this.amountOfVertices = amountOfVertices;
        this.vertPosBuffer = vertPosBuffer;

        this.mvpMatrix = glMatrix.mat4.create();
        this.modelMatrix = glMatrix.mat4.create();

        gl.useProgram(program);
        this.uMvpMatrixLocation = gl.getUniformLocation(program, "uMvpMatrix");
        this.program = program;
    }

    bind()
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertPosBuffer);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
    }

    draw(projViewMatrix)
    {
        gl.useProgram(this.program);

        glMatrix.mat4.fromRotationTranslationScale(this.modelMatrix, this.rotation, this.position, this.scale);
        glMatrix.mat4.mul(this.mvpMatrix, projViewMatrix, this.modelMatrix);
        gl.uniformMatrix4fv(this.uMvpMatrixLocation, false, this.mvpMatrix);

        this.bind();
        gl.drawArrays(gl.TRIANGLES, 0, this.amountOfVertices);
    }
}
