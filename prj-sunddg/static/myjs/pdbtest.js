    




    pdb.defineRepresentation = function() {

      var all = this.getAllAtoms();
       var ch = this.getChain(all, chain_data["chains"])
       var hetatm = this.removeSolvents(this.getHetatms(all));
       this.colorByChain(ch);

       var asu = new THREE.Object3D();
       this.drawCartoon(asu, ch, this.curveWidth, this.thickness);

       // con slice, puedo elegir cuáles matrices quiero! asi limito el numero de cadenas mostradas
/*
       testmats = this.protein.biomtMatrices[1]*/
       biomt = this.protein.biomtMatrices
       identity_matrix = biomt[1]

  /*     testmats = Array.prototype.concat(undefined, undefined, undefined, undefined)*/

       this.drawSymmetryMates2(this.modelGroup, asu, testmats);

       this.modelGroup.add(asu);


   };

   // for testing!!
   pdb.rebuildScene();
   pdb.show();